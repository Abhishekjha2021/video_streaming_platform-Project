import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

 const registerUser=asyncHandler (async(req,res)=>{
    //steps that we have to follow--------------------

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullName, email, username, password } = req.body                 //get user details from frontend
    //  console.log("email: ", email);               //print it using postman tool----------
    //  console.log("password: ", password);

    //validation - not empty(check whether all the fields are non-empty)
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // check if user already exists: username, email---
    // const existedUser = await User.findOne({
    //     $or: [{ username }, { email }]  //$or use krne se ab hum kitne bhi parameters se check kr skte hai,existed user ko..either by email or username or password or etc---
    // })

    // if (existedUser) {
    //     throw new ApiError(409, "User with email or username already exists")
    // }

 })

 export { registerUser }