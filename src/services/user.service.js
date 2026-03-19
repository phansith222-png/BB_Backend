import { prisma } from "../lib/prisma.js"

export async function getUserBy(field, value) {
    return await prisma.user.findFirst({
        where: { [field]: value },
        include:{
            userInfo:true
        }
    })
}

export async function createUser(data) {
    const { firstName, lastName, zodiac, dateOfBirth, role, ...userData } = data
    return await prisma.user.create({
        data: {
            ...userData,
            userInfo: {
                create: {
                    firstName: firstName || 'New',
                    lastName: lastName || 'User',
                    zodiac: zodiac || null,
                    dateOfBirth: dateOfBirth || null
                }
            }
        },
        include: {
            userInfo: true
        }
    })
}