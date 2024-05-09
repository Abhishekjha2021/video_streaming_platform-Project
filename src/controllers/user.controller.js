import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
// import {ApiError} from "./utils/ApiError.js"
import { ApiError } from "../utils/ApiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()  //generateAccessToken() , is function that we built in user.model.js part. and we are calling it here to make token--
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

//registering the user-------------
 const registerUser=asyncHandler (async(req,res)=>{
    //steps, that we have to follow--------------------

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullName, email, username, password } = req.body                 //ye 4 details le rhe hai user se-----
    //  console.log("email: ", email);               //print it using postman tool----------
    //  console.log("password: ", password);

    //validation - not empty(check whether all the fields are non-empty)
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // check if user already exists: username, email---
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]  //$or use krne se ab hum kitne bhi parameters se check kr skte hai,existed user ko..either by email or username or password or etc---
        //ya to username se,ya email se check kr lo ki user phle se existed to nhi hai ------------
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    // console.log(req.files);

    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   
    // create user object - create entry in db----------
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",  //if coverImage isn't there then use blank but if it is there then use its url--------
        email, 
        password,
        username: username.toLowerCase()
    })

    // check for user creation------------
    const createdUser = await User.findById(user._id).select(       //as DB generates a unique _id for all the users,so check by that id that whether user is created or not-----
        "-password -refreshToken"       // remove password and refresh token field from response
    )

    
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    //return response----------------------
    /*  statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""*/

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

//user login------------------------------
const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    // console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

    //caling tokens---------------------------------------
   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    //loggedInUserreturn krte time ,password and refreshToken ko show mat krna-----------------
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        /*statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""*/

        new ApiResponse(        //ApiResponse me below items send kr rha hai..check in utils part--------------
            200,    //status code of response------------
            {
                user: loggedInUser, accessToken, refreshToken       //data part of response------
            },
            "User logged In Successfully"                   //message of response------------
        )
    )

})

//user logout---------------
const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})



 export { 
    registerUser,
    loginUser,
    logoutUser
 }