import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"


const app=express()

app.use(cors({          //cors ko import krne ke baad ,uska configuration krna hoga ....i.e usme hum kya kya kese kese chahte hai---------we use .use for conf....and one more thing abhi configure hote hai app banane ke baad ,bcz tabhi to app.use() kr payenge--
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//ab hmare pass backend me data kai jagah se aayega .url se bhi aayga ,koi json me data bhejenge and etc.so iska config. bhi krna hoga ---
app.use(express.json({limit: "10kb"}))      //agar data jso format me aa rha hai to ,10kb tak ka hi data bhej skte hai
app.use(express.urlencoded({extended: true,limit:"10kb"}))
app.use(express.static("public"))
app.use(cookieparser())
//above are the 4 configurations,that we have to do--------------

//routes import------------
import userRouter from "./routes/user.routes.js"

//routes declaration---------
app.use("/api/v1/users",userRouter)   //yha api/v1/users  url hit hone par cmd routes ke pass jayega and then wha jo likha hoga further wo process hoga----

//https://localhost:8080/api/v1/users/register         final url is like bcz ab routes me register user ho rha hai ..so register comes here-------
// export default app // or export { app }
export { app }
