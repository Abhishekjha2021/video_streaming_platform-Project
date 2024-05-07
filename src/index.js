// import mongoose from "mongoose";             //we are not using these here . so remove it----------------
// import {DB_NAME} from "./constants.js"
import { app } from "./app.js"

import dotenv from "dotenv"         // as soon as possible in your application import dotenv and configure dotenv .bcz we want ki jitna jaldi hmara
                            //app. load ho utni jaldi hmari sabhi environment variable har jagah avilable ho--so agar main file me hi load ho jaye to har jagah avilable ho jayga .so import dotenv as soon as possible--

import connectDB from "./db/index.js"


dotenv.config({
    path:'./.env'
})

connectDB()

//as we have applied async operation which returns a promise ,so we will write below code also--------
.then(()=>{

    //it's a good practice to always write, app.on() part before app.listen()--------------------
    app.on("error",(error)=>{
        console.log("ERROR Occured: ",error);
        throw error;
    })
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongoDB connection failed: ",err)
})




//this part is also correct, but not to make this file conjusted we are importing database connection part, from another file---------

// import express from "express"
// const app=express()

//  //taking ()() for immediate execute-------------------------
// ;(async()=>{

//     //if the DB got connected-------------------------
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{           //if after connection ,is any error -----------------
//             console.log("ERROR: ",error);
//             throw error;
//         })

        
//         //if there is no error then connect the DB with app-------------------
//         app.listen(process.env.PORT,()=>{       
//             console.log(`App is Listening on port ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.error("ERROR: ",error)          //if DB didn't connect then throw the error---------------
//         throw err
//     }
// })()