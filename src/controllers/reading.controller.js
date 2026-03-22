import createHttpErrors from 'http-errors'
import {findSpread } from '../services/reading.service.js'
import { prisma } from '../lib/prisma.js'
import { success } from 'zod'
export async function initial(req, res, next) {
    try {
        const { user, userInfo } = req.user
        const {spreadId,question} = req.body
        if(!spreadId || !question) {
            return next(createHttpErrors[401]('Please provide Spreadtype and your question'))
        }
        const spreadInfo = await findSpread(spreadId)
        if(!spreadInfo) {
            return next(createHttpErrors[401]('Cannot find this Spread Type'))
        }
        const newReading = await prisma.reading.create({
            data:{
                userInfoId:userInfo.id,
                spreadId:spreadInfo.id,
                question,
            }
        })
        res.status(201).json({
            success:true,
            message: "Initial the reading session",
            data:{
                readingId: newReading.id,
                spreadName: spreadInfo.name,
                cardCount:spreadInfo.cardCount,
            }
        })
    } catch (error) {
        next(error)
    }

}