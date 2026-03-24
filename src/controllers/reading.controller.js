import createHttpErrors from 'http-errors'
import { findReading, findSpread } from '../services/reading.service.js'
import { prisma } from '../lib/prisma.js'
import { askGemini } from '../utils/ai.js'


export async function initial(req, res, next) {
    try {
        const { user, userInfo } = req.user || {}
        const { spreadId, question,allowReversed, isDaily } = req.body
        if (!spreadId || !question) {
            return next(createHttpErrors[401]('Please provide Spreadtype and your question'))
        }
        const spreadInfo = await findSpread(spreadId)
        if (!spreadInfo) {
            return next(createHttpErrors[401]('Cannot find this Spread Type'))
        }
        const newReading = await prisma.reading.create({
            data: {
                userInfoId: userInfo?.id || null,
                spreadId: spreadInfo.id,
                question,
                isDaily:isDaily ||false,
                status: "PENDING"
            }
        })
        res.status(201).json({
            success: true,
            message: "Initial the reading session",
            data: {
                readingId: newReading.id,
                spreadName: spreadInfo.name,
                cardCount: spreadInfo.cardCount,
                allowReversed:allowReversed
            }
        })
    } catch (error) {
        next(error)
    }

}

export async function shuffle(req, res, next) {
    try {
        const { readingId, times,allowReversed } = req.body
        const reading = await findReading(readingId)
        console.log(reading)
        if (!reading) {
            return next(createHttpErrors[400]("Invalid Shuffle Session"))
        }
        const allCards = await prisma.card.findMany()
        const deckWithReversed = allCards.map(card =>({
            id:card.id,
            isReversed:allowReversed ? Math.random() < 0.5 :false
        }))
        const shuffledCards = deckWithReversed.sort(() => Math.random() - 0.5)
        const updateReadingDeck = await prisma.reading.update({
            where: { id: readingId },
            data: {
                deckOrder: shuffledCards,
                status: "SHUFFLED"
            }
        })
        res.status(200).json({
            success: true,
            message: updateReadingDeck.status,
            deckOrder: updateReadingDeck.deckOrder
        })
    } catch (error) {
        next(error)
    }
}


export async function cut(req, res, next) {
    try {
        const { readingId, position } = req.body
        if (!position) {
            return next(createHttpErrors[400]('please select position'))
        }
        const reading = await findReading(readingId)
        const deck = reading.deckOrder
        const cutDeck = (arr, position) => {
            const firstPart = deck.slice(0, position)
            const backPart = deck.slice(position)
            return [...backPart, ...firstPart]
        }
        const newDeck = cutDeck(deck, Number(position))
        const updateDeck = await prisma.reading.update({
            where: { id: readingId },
            data: {
                deckOrder: newDeck,
                status: "CUT"
            }
        })
        res.status(200).json({
            success: true,
            position: position,
            status: updateDeck.status,
            deckOrder: updateDeck.deckOrder
        })
    } catch (error) {
        next(error)
    }
}

export async function pick(req, res, next) {
    try {
        const { readingId, selectId } = req.body
        const reading = await findReading(readingId)
        if (!reading) {
            return next(createHttpErrors[400]("Invalid Pick The Card session"))
        }
        const cardId = selectId.map((arr, index) => {
            return arr.id
        })
        const spread = await findSpread(reading.spreadId)
        const allCards = await prisma.card.findMany({
            where: {
                id: {
                    in: cardId
                }
            }
        })
        res.status(200).json({
            success: true,
            spreadType: spread.name,
            question:reading.question,
            card: allCards
        })
    } catch (error) {
        next(error)
    }
}

export async function aiInterpret(req, res, next) {
    try {
        const {readingId,spreadType,question,card} = req.body
        const reading = await findReading(readingId)
        if (!reading) {
            return next(createHttpErrors[400]("Invalid AI interpret session"))
        }
        const targetCard = card[0]
        const responseAI = await askGemini(spreadType,question,targetCard)
        // console.log(responseAI)
        // await prisma.reading.update({
        //     where:{id:readingId},
        //     data:{
        //         aiInterpretation:responseAI,
        //         status:"COMPLETED"
        //     }
        // })
        res.status(200).json({
            success : true,
            data: responseAI
        })
    } catch (error) {
        next(error)
    }
}