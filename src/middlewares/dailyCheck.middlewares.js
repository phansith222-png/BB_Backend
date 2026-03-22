import createHttpErrors from 'http-errors'
import { prisma } from '../lib/prisma.js'
import dayjs from 'dayjs'
export async function dailyCheck(req, res, next) {
    try {
        const { isDaily } = req.body
        const { userInfo } = req.user
        // console.log(userInfo)
        if (isDaily === true) {
            const alreadyRead = await prisma.reading.findFirst({
                where: {
                    userInfoId: userInfo.id,
                    isDaily: true,
                    spreadType:1,
                    createdAt: { gte: dayjs().startOf('date').toDate() }
                }
            })
            if (alreadyRead) {
                return next(createHttpErrors[400]("Already picked"))
            }
        }
        next()

    } catch (error) {
        next(error)
    }
}