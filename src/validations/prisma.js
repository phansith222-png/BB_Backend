import { z } from 'zod';
import bcrypt from 'bcrypt';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/


const identityKey = val => emailRegex.test(val) ? 'email' : 'mobile'


export const registerSchema = z.object({
    identity: z.string().min(2, "must have more than 2 characters")
        .refine(val => {
            return emailRegex.test(val) || mobileRegex.test(val)
        }, "Email or mobile phone require"),
    username: z.string().min(8, "username must have more than 8 characters"),
    password: z.string().min(6, "password at least 6 characters"),
    confirmPassword: z.string().min(1, "confirm password is required"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    zodiac: z.string().optional(),
    dateOfBirth: z.string().optional()
}).refine(input => input.password === input.confirmPassword,{
    message: "password must match with confirm password",
    path: ['confirmpassword']
})
.transform(async data => ({
    [identityKey(data.identity)]: data.identity,
    username: data.username,
    password: await bcrypt.hash(data.password, 8),
    firstName:data.firstName,
    lastName:data.lastName,
    profileImage:data.profileImage,
    zodiac: data.zodiac,
    dateOfBirth: data.dateOfBirth,
    role: data.role
}))