import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function POST(request : Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user : User = session?.user as User

    if(!session || !user){
        return Response.json({success : false , message : "User Not Found"},{status : 400})
    }

    const userId = new mongoose.Types.ObjectId(user._id)

    try {

        const user = await UserModel.aggregate([
            {$match : {_id : userId}},
            {$unwind : '$messages'},
            {$sort : {'messages.createdAt':-1}},
            {$group : {_id : '$_id',messages : {$push : '$messages'}}}
        ]).exec()

        if(!user || user.length === 0){
            console.log("get-messages : No messages Found");
            
            return Response.json({success : false,message : "No data Found"},{status : 400})
        }
        
        return Response.json({success : true , messages : user[0].messages},{status : 200})
    } catch (error) {
        console.log("Error getting Messages")
        return Response.json({success : false , message : "Error getting Messages"},{status : 500})
    }


}