import createHttpErrors from 'http-errors'
import prisma from '../lib/prisma.js'
import dayjs from 'dayjs'
export async function dailyCheck(req, res, next) {
    try {
        const { isDaily } = req.body
        const { user, userInfo } = req.user || {}
        if (isDaily === true) {
            if (user && userInfo) {
                const alreadyRead = await prisma.reading.findFirst({
                    where: {
                        userInfoId: userInfo.id,
                        isDaily: true,
                        // spreadId: 1,
                        createdAt: { gte: dayjs().startOf('day').toDate() }
                    },
                    include: {
                        readCards: { include: { card: true } },
                        aiInterpretation: true,
                    }
                })
                if (alreadyRead)
                    return res.status(200).json({
                        success: true,
                        message: "You already have a daily reading",
                        isAlreadyDrawn: true, // ส่ง Flag ไปบอกหน้าบ้าน
                        data: alreadyRead
                    });
            } else {
            }
        }
        return next()

    } catch (error) {
        return next(error)
    }
}
