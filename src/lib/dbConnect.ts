import mongoose from "mongoose";

type connectionObject  = {
    isConnected?:number
}

const connection : connectionObject = {

}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected to Database");
        return       
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
        
        connection.isConnected = db.connections[0].readyState
        console.log("Successfully Connected to Database");
        
    } catch (error) {
        console.log("Not able to Connect to the database" , error)
        process.exit(1)
    }
}

export default dbConnect