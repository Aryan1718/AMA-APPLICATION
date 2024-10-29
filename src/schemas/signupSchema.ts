import {z} from 'zod'

export const usernameValidation = z.string()
                                    .min(2,"Username must be at least 2 character")
                                    .max(12,"Username must be no more than 12 characters")
                                    .regex(/^[a-zA-Z0-9]+$/,"Username must be not contain special characters")
export const singupSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message : "Invalid Email Address"}),
    password : z.string().min(6,{message : "Password must be at least 6 character"}).max(12,{message : "Password must be no more than 12 characters"})
})