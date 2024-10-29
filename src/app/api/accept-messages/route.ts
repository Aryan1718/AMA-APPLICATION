import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from 'next-auth/next';
import { User } from "next-auth";

export async function POST(request : Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !user){
        console.log("accept-messages : Not Authenticated")
        return Response.json({success : false , message : "Not Authenticated"},{status : 400})
    }

    const userId = user._id

    const {accpetMessages} = await request.json()

    try {

        const updatedUser = await UserModel.findByIdAndUpdate({_id : userId},{isAcceptingMessages:accpetMessages},{new : true})

        if(!updatedUser) {
            return Response.json({success : false , message : "Not Able to Change the Status"},{status : 400})
        }

        return Response.json({success : true , message : "Successfully Changed The Status",updatedUser},{status : 200})

        
    } catch (error) {
        console.log("accept-message : Route Error");
        
        return Response.json({success : false , message : "Error In Accepting Message"},{status : 500})
    }
}

export async function GET(request : Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user : User = session?.user as User

    if(!session || !user){
        console.log("accept-messages : Not Authenticated")
        return Response.json({success : false , message : "Not Authenticated"},{status : 400})
    }

    const userId = user._id 

    try {

        const foundUser = await UserModel.findById(userId)

        if(!foundUser) {
            return Response.json({success : false , message : "User Not Found"},{status : 400})
        }

        return Response.json({success : true , message : "User Found Getting the Status ",isAcceptingMessages : foundUser.isAcceptingMessages},{status : 200})
        
    } catch (error) {
        console.log("Not able to Fetch the Status");
        return Response.json({success : false , message : "Not able to Fetch the Status"},{status : 500})
        
    }


}