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
}).refine(input => input.password === input.confirmPassword, {
    message: "password must match with confirm password",
    path: ['confirmpassword']
})
    .transform(async data => ({
        [identityKey(data.identity)]: data.identity,
        username: data.username,
        password: await bcrypt.hash(data.password, 8),
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: data.profileImage,
        zodiac: data.zodiac,
        dateOfBirth: data.dateOfBirth,
        role: data.role
    }))


export const loginSchema = z.object({
    username: z.string().min(8, "Username must be at least 8 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long")
}).transform(data => ({
    username: data.username,
    password: data.password
}))

export const initReadingSchema = z.object({
    spreadId: z.coerce.number().int().positive(),
    question: z.string().max(500).optional(),
    allowReversed: z.boolean().optional().default(false),
    isDaily: z.boolean().optional().default(false),
})

export const shuffleSchema = z.object({
    readingId: z.coerce.number().int().positive(),
    allowReversed: z.boolean().optional().default(false),
})

export const cutSchema = z.object({
    readingId: z.coerce.number().int().positive(),
    position: z.coerce.number().int().min(0),
})

export const pickSchema = z.object({
    readingId: z.coerce.number().int().positive(),
    selectId: z.array(z.object({
        id: z.coerce.number().int().positive(),
        isReversed: z.boolean().optional(),
    })).min(1),
})

export const aiInterpretSchema = z.object({
    readingId: z.coerce.number().int().positive(),
    spreadType: z.string().min(1),
    question: z.string().max(500).optional(),
    card: z.array(z.object({ id: z.number(), name: z.string() })).min(1),
})

export const saveReadingSchema = z.object({
    readingId: z.coerce.number().int().positive(),
    note: z.string().max(2000).optional(),
})

export const forgotPasswordSchema = z.object({
    identity: z.string().min(1, "กรุณากรอกอีเมลหรือชื่อผู้ใช้"),
})

export const resetPasswordSchema = z.object({
    token: z.string().min(1, "token ไม่ถูกต้อง"),
    password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
    confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
}).transform(async ({ password, token }) => ({
    token,
    hashedPassword: await bcrypt.hash(password, 8),
}))

export const updateMeSchema = z.object({
    identity: z.string().optional().or(z.literal('')),
    username: z.string().min(8, ("Username must be at least 8 characters long")).optional(),
    firstName: z.string().optional().or(z.literal('')),
    lastName: z.string().optional().or(z.literal('')),
    zodiac: z.string().optional().or(z.literal('')),
    dateOfBirth: z.string().optional().or(z.literal('')),
    profileImage: z.string().optional().or(z.literal('')),
}).transform((data) => {
    const transform = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: data.profileImage,
        zodiac: data.zodiac,
        dateOfBirth: data.dateOfBirth,
    }
    if(data.identity){
        const key = identityKey(data.identity);
        transform[key]= data.identity
    }
    return transform
})