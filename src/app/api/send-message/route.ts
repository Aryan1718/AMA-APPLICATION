import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";


export async function POST(request : Request){
    await dbConnect()


    try {

        const {username,content} = await request.json()

        const user = await UserModel.findOne({username})

        if(!user){
            console.log("User Not Found");
            return Response.json({success : false , message : "User Not Found"},{status:400})
        }

        if(!user.isAcceptingMessages){
            return Response.json({success : false, message : "User not accpeting messages currently."},{status : 400})
        }

        const newMessage = {
            content,
            createdAt : new Date()
        }

        user.messages.push(newMessage as Message)

        await user.save()

        return Response.json({success : true , message : "Message Sent Successfully"},{status : 200})
        
    } catch (error) {
        console.log(error)
        return Response.json({success : false , message : error},{status : 500})
    }
}