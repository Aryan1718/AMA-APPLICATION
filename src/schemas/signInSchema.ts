import {z} from 'zod'
import { usernameValidation } from './signupSchema'

export const signInSchema = z.object({
    identifier : usernameValidation,
    password : z.string()
})