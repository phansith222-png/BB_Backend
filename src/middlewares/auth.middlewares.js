import createHttpErrors from 'http-errors'
import { verifyToken } from '../utils/jwt.js'
import { getUserBy } from '../services/user.service.js'

export async function authenticate(req,res,next) {
    const authorization = req.headers.authorization
    if(!authorization || !authorization.includes('Bearer ')) {
        return next(createHttpErrors[401]('Unauthorized 1'))
    }
    // console.log(authorization)
    const token = authorization.split(" ")[1]
    if(!token) {
        return next(createHttpErrors[401])('Unauthorized 2')
    }
    // console.log(token)
    const payload = await verifyToken(token)

    const foundUser = await getUserBy("id",payload.id)
    const {password,createdAt,updatedAt,userInfo,...user} = foundUser
    req.user = {user:user,userInfo:userInfo[0]}
    next()
}
