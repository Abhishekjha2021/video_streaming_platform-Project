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
//above are 4 configurations,that we have to do--------------

export default app // or export { app }
