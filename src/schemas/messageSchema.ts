import {z} from 'zod'

export const messageSchema = z.object({
    content : z.string()
               .min(10, "Minimum 10 character")
               .max(300,'Only allowed 300 characters no more then that')
})