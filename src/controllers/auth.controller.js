import crypto from 'crypto'
import prisma from "../lib/prisma.js"
import { createUser, getUserBy } from "../services/user.service.js"
import { createToken } from "../utils/jwt.js"
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "../validations/prisma.js"
import { sendPasswordResetEmail } from "../utils/mailer.js"
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt';

export async function register(req, res, next) {
    try {
        const data = await registerSchema.parseAsync(req.body)
        const existingUser = await prisma.user.findUnique({
            where: { username: data.username }
        })
        if (existingUser) {
            return next(createHttpError[400]('Username is already taken'))
        }
        const identityKey = data.email ? 'email' : 'mobile'
        const foundUser = await getUserBy(identityKey, data[identityKey])
        if (foundUser) {
            return next(createHttpError[409]('This user have already register'))
        }
        const createNewuser = await createUser(data)
        const profileInfo = createNewuser.userInfo[0]
        const user = {
            id: createNewuser.id,
            [identityKey]: data[identityKey],
            username: createNewuser.username,
            userInfo: profileInfo
        }
        res.status(201).json({
            success: true,
            message: "Register Successful",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export async function login(req, res, next) {
    try {
        const data = loginSchema.parse(req.body)
        const foundUser = await getUserBy("username", data.username)
        if (!foundUser) {
            return next(createHttpError[401]("Invalid username or password"))
        }
        const pwok = await bcrypt.compare(data.password, foundUser.password)
        if (!pwok) {
            return next(createHttpError[401]("Invalid username or password"))
        }
        const payload = { id: foundUser.id }
        const accesstoken = createToken(payload)
        const { password, createdAt, updatedAt, userInfo, ...user } = foundUser
        res.status(200).json({
            message: "Login Success",
            token: accesstoken,
            user: user,
            profile: userInfo[0] || null
        })
    } catch (error) {
        next(error)
    }
}

export async function forgotPassword(req, res, next) {
    try {
        const { identity } = await forgotPasswordSchema.parseAsync(req.body)
        const user = await prisma.user.findFirst({
            where: { OR: [{ email: identity }, { username: identity }] }
        })
        if (!user || !user.email) {
            return res.json({ success: true, message: "หากบัญชีนี้มีอยู่ ระบบจะส่งอีเมลให้" })
        }
        const token = crypto.randomBytes(32).toString('hex')
        await prisma.user.update({
            where: { id: user.id },
            data: { resetToken: token, resetTokenExpiry: new Date(Date.now() + 3_600_000) }
        })
        await sendPasswordResetEmail(user.email, token)
        res.json({ success: true, message: "หากบัญชีนี้มีอยู่ ระบบจะส่งอีเมลให้" })
    } catch (error) {
        next(error)
    }
}

export async function resetPassword(req, res, next) {
    try {
        const { token, hashedPassword } = await resetPasswordSchema.parseAsync(req.body)
        const user = await prisma.user.findFirst({
            where: { resetToken: token, resetTokenExpiry: { gt: new Date() } }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "ลิงก์หมดอายุหรือไม่ถูกต้อง" })
        }
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null }
        })
        res.json({ success: true, message: "เปลี่ยนรหัสผ่านสำเร็จ" })
    } catch (error) {
        next(error)
    }
}
