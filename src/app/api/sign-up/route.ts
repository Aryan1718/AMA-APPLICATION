import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import {sendEmail} from '@/helpers/sendVerificationEmail'
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";


export async function POST(request : NextRequest) {
    await dbConnect()

    try {

        const {email,username,password} = await request.json()

        const existingVerifiedUserByUsername = await UserModel.findOne({username,isVerified:true})

        if(existingVerifiedUserByUsername) {
            return NextResponse.json({
                success : false,
                message : "Username already Exist"
            },
            {
                status : 400
            }
        )
        }
        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if(existingUserByEmail){

            if(existingUserByEmail.isVerified){
                return NextResponse.json({
                    success : false,
                    message : "User already Exist With this email address"
                },
                {
                    status : 400
                }
            )
            }
            else{
                const hashPass = await bcrypt.hash(password,10)
                existingUserByEmail.password = hashPass
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyTime = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
            
        } else{
            const hashedPassword = await bcrypt.hash(password,10)
            const verifyTime = new Date()
            verifyTime.setHours(verifyTime.getHours() + 1)
            const newUser = new UserModel({
                username,
                email,
                password : hashedPassword,
                verifyCode,
                verifyTime,
                isVerified : false,
                isAcceptingMessages : true,
                messages : []

            })

            await newUser.save()
        }

        //send Verification Email

        const sendEmailResponse = await sendEmail(email,username,verifyCode)

        if(!sendEmailResponse.success){
            return NextResponse.json({
                success : false,
                message : "Error Occure While Sending Email"
            },{
                status : 400
            }
        )
        }

        return NextResponse.json({
            success : true,
            message : "User Successfully Registered Please Verify Your Email "
        },
        {
            status : 200
        }
    )
        
    } catch (error) {
        console.log('Error registering user: ',error);
        return NextResponse.json({
            success : false,
            mesaage : "Error registering user"
        },
        {
            status : 500
        }
    )
        
    }
}


