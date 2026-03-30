import { success } from "zod"
import { prisma } from "../lib/prisma.js"
import { updateMeSchema } from "../validations/prisma.js"
import { getUserBy } from "../services/user.service.js"


export async function getMe(req, res, next) {
    const { user, userInfo } = req.user
    res.status(200).json({
        status: true,
        user,
        userInfo
    })
}
export async function updateMe(req, res, next) {
    try {
        const { user, userInfo } = req.user
        const userId = user.id
        // console.log(userInfo)
        const userInfoId = userInfo.id
        console.log(req.body)
        const payload = updateMeSchema.parse(req.body)
        const { firstName, lastName, profileImage, zodiac, dateOfBirth, ...userData } = payload;
        console.log(payload)
        const newProfile = await prisma.user.update({
            where: { id: userId },
            data: {
                ...userData,
                userInfo: {
                    update: {
                        where: { id: userInfoId },
                        data: {
                            firstName,
                            lastName,
                            profileImage,
                            zodiac,
                            dateOfBirth
                        }
                    }
                }
            }
        })
        const userNew = await getUserBy("id", newProfile.id)
        res.status(200).json({
            success: true,
            message: "Successfully updated your personal information",
            data: userNew
        })
    } catch (error) {
        next(error)
    }

}
export async function getHistory(req, res, next) {
    try {
        const user = req.user;
        console.log(user)
        if (user) {
            const history = await prisma.reading.findMany({
                where: {
                    userInfoId: user.userInfo.id,
                    status: "COMPLETED"
                },
                orderBy: { createdAt: 'desc' },
                include: {
                    spread: true,
                    readCards: {
                        include: {
                            card: true
                        }
                    },
                    aiInterpretation: true,
                    savedReading: true,
                    userInfo: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profileImage: true
                        }
                    }
                }
            });
            const {deckOrder,...resHistory} = history[0]
        
            return res.status(200).json({ success: true, data: resHistory });
        }
    } catch (error) {
        next(error)
    }
}
export async function saveReading(req, res, next) {
    try {
        const { user, userInfo } = req.user
        console.log('userInfo', userInfo)
        const { readingId, note } = req.body
        console.log('readingId', readingId)

        const saved = await prisma.savedReading.upsert({
            where: { readingId: +readingId },
            update: {
                note: note
            },
            create: {
                readingId: +readingId,
                userInfoId: +userInfo.id,
                note,

            }
        })

        res.status(200).json({ success: true, data: saved });
    } catch (error) {
        next(error)
    }
}

export async function getReading(req, res, next) {
    try {
        const userInfoId = req.user?.userInfo?.id
        const saveReading = await prisma.savedReading.findMany({
            where: { userInfoId: +userInfoId },
            include: {
                reading: {
                    include: {
                        aiInterpretation: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        res.status(200).json({ success: true, data: saveReading })
    } catch (error) {
        next(error)
    }
}

export async function deleteSavedReading(req, res, next) {
    try {
        // ID req.params ของ saveReading
        const { id } = req.params
        const userInfoId = req.user?.userInfo?.id;
        const existReading = await prisma.savedReading.findFirst({
            where: {
                id:+id,
                userInfoId,
            }
        })
        console.log(existReading)
        if (!existReading) {
            return res.status(404).json({
                success: false,
                message: "Saved reading not found or access denied."
            });
        }
        const deletedReading = await prisma.savedReading.delete({
            where:{
                id:+id
            }
        })
        res.status(200).json({
            success:true,
            message:"This record has already been deleted",
            data:deletedReading
        })
    } catch (error) {
        next(error)
    }
}