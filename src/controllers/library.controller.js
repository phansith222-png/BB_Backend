
import prisma from "../lib/prisma.js"

export async function getMulCards(req, res, next) {
    try {
        const allCards = await prisma.card.findMany()
        res.status(200).json({
            success: true,
            data: allCards
        })
    } catch (error) {
        next(error)
    }
}

export async function getCards(req, res, next) {
    try {
        const { id } = req.params
        const selectedCard = await prisma.card.findUnique({
            where: { id: +id }
        })
        res.status(200).json({
            success: true,
            data: selectedCard
        })
    } catch (error) {
        next(error)
    }
}
