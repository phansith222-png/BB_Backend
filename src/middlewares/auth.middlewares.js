import createHttpErrors from 'http-errors'
import { verifyToken } from '../utils/jwt.js'
import { getUserBy } from '../services/user.service.js'

export async function authenticate(req, res, next) {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.includes('Bearer ')) {
        return next(createHttpErrors[401]('Unauthorized 1'))
    }
    // console.log(authorization)
    const token = authorization.split(" ")[1]
    if (!token) {
        return next(createHttpErrors[401]('Unauthorized'))
    }
    const payload = await verifyToken(token)

    const foundUser = await getUserBy("id", payload.id)
    const { password, createdAt, updatedAt, userInfo, ...user } = foundUser
    req.user = { user: user, userInfo: userInfo[0] }
    next()
}

export async function optionalAuth(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.includes('Bearer ')) {
        req.user = null
        return next()
    }
    const token = authorization.split(" ")[1]
    try {
        const payload = await verifyToken(token)
        const foundUser = await getUserBy("id", payload.id)
        const { password, createdAt, updatedAt, userInfo, ...user } = foundUser
        req.user = { user: user, userInfo: userInfo[0] }
        next()
    } catch (error) {
        req.user = null
        return next()
    }
}   