import prisma from "../lib/prisma.js";

export async function findSpread(spreadId) {
    return await prisma.spread.findFirst({
        where: { id: Number(spreadId) }
    })
}

export async function findReading(readingId) {
    return await prisma.reading.findFirst({
        where: { id: Number(readingId) }
    })
}

export async function findReadingForShare(readingId) {
    return await prisma.reading.findFirst({
        where: { id: Number(readingId) },
        include: {
            spread: {
                include: { spreadType: true }
            },
            readCards: {
                orderBy: { position: 'asc' },
                include: { card: true }
            },
            aiInterpretation: true
        }
    })
}
