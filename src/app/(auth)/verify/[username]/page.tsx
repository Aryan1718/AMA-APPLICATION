'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { verifySchema } from '@/schemas/verifySchema'
import {useToast} from "@chakra-ui/toast"
import axios, { AxiosError } from 'axios'
import { apiResponse } from '@/types/apiResponse'
import { Loader2 } from 'lucide-react'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function page() {
    const router = useRouter()
    const params = useParams<{username : string}>()
    const toast = useToast()
    const [isLoading,setIsLoading] = useState(false)
    

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
      })
    
    const onSubmit = async (data : z.infer<typeof verifySchema>)=>{
        setIsLoading(true)
        try {
            const response = await axios.post('/api/verify-code',{
                username : params.username,
                code : data.code
            })

            toast({
                title : 'Verification Successfully',
                description : response.data.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            
            // router.replace('/sign-in')
            
        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>
            console.log(axiosError.response?.data.message)
            toast({
                title : 'Verification Failed',
                description : axiosError.response?.data.message ?? 'An error occurred. Please try again.',
                status : 'error'
            })
            setIsLoading(false)
        } finally{
            setIsLoading(true)
        }
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Verify Your Account' }
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
        </div>
    </div>
  )
}

export default page