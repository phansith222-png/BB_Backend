import { prisma } from "../lib/prisma.js"
import { createUser, getUserBy } from "../services/user.service.js"
import { createToken } from "../utils/jwt.js"
import { loginSchema, registerSchema } from "../validations/prisma.js"
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt';

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
    try {
        const data = loginSchema.parse(req.body)
        const foundUser = await getUserBy("username",data.username)
        if(!foundUser){
            return next(createHttpError[401]("Invalid Username or Password 1 "))
        }
        const pwok = await bcrypt.compare(data.password,foundUser.password)
        if(!pwok){
            return next(createHttpError[401]("Invalid Username or Password 2 "))
        }
        const payload = {id: foundUser.id}
        console.log(payload)
        const accesstoken = createToken(payload)
        const {password,createdAt,updatedAt,userInfo,...user}= foundUser
        res.status(200).json({
            message: "Login Success",
            token:accesstoken,
            user:user,
            profile:userInfo[0]||null
        })
    } catch (error) {
        next(error)
    }
}
export async function getMe (req,res,next) {
    res.send("Get me Controller")
}
export async function updateMe (req,res,next) {
    res.send("Update me Controller")
}