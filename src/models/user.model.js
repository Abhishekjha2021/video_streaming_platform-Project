import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

const userSchema = new Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true,
        index:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true,
    },

    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },

    avatar:{
        type:String,        //cloudinary url---------
        required:true
    },

    coverImage:{
        type:String         //cloudinary url--------
    },

    watchHistory:[          //this field is an array 
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],

    password:{
        type:String,
        required:[true,"Password is required"]
    },

    refreshToken:{
        type:String
    }

},{timestamps:true,versionKey:false})

//using an encryption method by using "pre" hook-----------
userSchema.pre("save",async function (next){

    if(this.isModified("password")){        
        this.password=await bcrypt.hash(this.password,10)
        next()
    }
    else{
        return next();
    }
})
 
userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)         //it returns value in true and false----------
}



//for generating access token and refresh token----------
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const  User= mongoose.model("User",userSchema)
