import * as z from "zod"

export const authSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z
        .string()
        .min(6, {
            message: "Password must be at least 6 characters long",
        })
        .max(100)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, {
            message:
                "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special character",
        }),
})

