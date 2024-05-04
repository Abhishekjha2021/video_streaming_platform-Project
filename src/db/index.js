import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

const connectDB=async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)    //we can even store the await part in a variable ,bcz mongoose gives us a return object------
        //upper part confirms that is the connection is done ,then come to below part------
        console.log(`\n MongoDB connected !! D HOST: ${connectionInstance.connection.host}`)    //if the connection is ok,then print this part-----here this part, "connectionInstance.connection.host" is imt. learn more about it--

    }catch(error){
        console.log("MONGODB connection error: ",error)
        process.exit(1)     //"we can use "process" to identify current running process ,and exit(1) terminates the process where 1 represents failure part------ 
    }
}

export default connectDB 