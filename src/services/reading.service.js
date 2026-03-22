import { prisma } from "../lib/prisma.js";

export async function findSpread(spreadId) {
    return await prisma.spread.findFirst({
        where:{id:Number(spreadId)}
    })
}