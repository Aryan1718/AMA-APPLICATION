import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest,NextResponse } from "next/server";
import {z} from 'zod'
import { usernameValidation } from "@/schemas/signupSchema";

const UsernameQuerySchema = z.object({
    username : usernameValidation
})

export async function GET(request : NextRequest){
    await dbConnect()
    try {

        const {searchParams} = new URL(request.url) // this is the way to get the query parameter value from url
        const queryPara = {
            username : searchParams.get('username')
        }

        const resultUsername = UsernameQuerySchema.safeParse(queryPara) // this is the way to use ZOD

        if(!resultUsername.success){
            const usernameErrors = resultUsername.error.format().username?._errors || []
            return NextResponse.json({
                success : false,
                message : usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid query parameter"
            },{
                status : 400
            })
        }

        const {username} = resultUsername.data

        const existingUser = await UserModel.findOne({username,isVerified:true})

        if(existingUser){
            return NextResponse.json({
                success : false,
                message : "Sorry, username already taken. Please try a different username."
            },{
                status : 400
            })
        }

        return NextResponse.json({
            success : true,
            message : "Username is valid"
        },{
            status : 200
        })

        
    } catch (error) {
        console.log("Error while Checking Username validation",error);
        NextResponse.json({
            message : "Error While checking Username",
            success : false
        },{
            status : 500
        })
    }
}