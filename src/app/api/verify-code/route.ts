import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { useRouter } from "next/navigation";


export async function POST(request : Request){
    const router = useRouter()
    await dbConnect()
try {
        const {username,code} = await request.json()
    
        const decodedUsername = decodeURIComponent(username) // this will help you to remove all the unnecessary thing while geting data from uri

        const user = await UserModel.findOne({username:decodedUsername})

        if(!user) {
            console.log("Verify-code : Username not found");
            return Response.json({
                success : false,
                message : "User not found"
            },{
                status : 400
            })
        }

        if(user && user.isVerified){
            return Response.json({
                success : false,
                message : "User already Verified"
            },{
                status : 400
            })
        }

        const isVerifyCode = code === user.verifyCode

        if(!isVerifyCode) {
            return Response.json({
                success : false,
                message : "Check Code"
            },{
                status : 400
            })
        }

        user.isVerified = true
        user.verifyCode = ''
        await user.save()

        return Response.json({
            success : true,
            message : "Verified"
        },{
            status : 200
        })

        router.replace('/dash-board')

        

} catch (error) {
    console.log("Error Verifying User");
    return Response.json({
        success : false,
        message : "Not able to verify at this moment"
    },{
        status : 500
    })
    
}
}