import jwt from 'jsonwebtoken';

export function createToken (payload) {
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        algorithm: "HS256",
        expiresIn: "1d"
    })
    return token
}

export function verifyToken (token) {
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    // console.log(payload)
    return payload
}