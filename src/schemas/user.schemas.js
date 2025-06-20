import {z} from "zod"

const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string()
    .min(6, "Password must have at least 6 characters")
    .refine((val) => /[A-Z]/.test(val),{message: "Password must have at least 1 capital letter"})
    .refine((val) => /[!@#$%¨&*(),.?:{}|<>]/.test(val), {message: "Password must contain at least one special character"}),
    avatar: z.string()


})

const userIdSchema = z.object({
    userId: z.number().int().positive("User ID must be a positive integer")
})

export {userSchema, userIdSchema}