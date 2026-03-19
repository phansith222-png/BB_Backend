import { prisma } from "../lib/prisma.js"
import { createUser, getUserBy } from "../services/user.service.js"
import { registerSchema } from "../validations/prisma.js"
import createHttpError from 'http-errors'
export async function register (req,res,next) {
    const data = await registerSchema.parseAsync(req.body)
    const existingUser = await prisma.user.findUnique({
        where:{username:data.username}
    })
    if(existingUser) {
        return next(createHttpError[400]('Username is already taken'))
    }
    const identityKey = data.email ? 'email' : 'mobile'
    const foundUser = await getUserBy(identityKey,data[identityKey])
    if(foundUser) {
        return next(createHttpError[409]('This user have already register'))
    }
    const createNewuser = await createUser(data)
    console.log('createNewuser', createNewuser)
    const profileInfo = createNewuser.userInfo[0]
    const user = {
        id: createNewuser.id,
        [identityKey]: data[identityKey],
        username:createNewuser.username,
        userInfo:profileInfo
    }
    res.json({
        message : "Register Successful",
        data:user
    })
}
export async function login (req,res,next) {
    res.send("Login Controller")
}
export async function getMe (req,res,next) {
    res.send("Get me Controller")
}
export async function updateMe (req,res,next) {
    res.send("Update me Controller")
}