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

//using an encryption method by using "pre" hook of mongoose-----iska use hota hai ki,kisi event(eg;-data save hone se phle,validate,remove,updateOne,deleteOne....these are some events jiske phle hum pre hook ko use kr skte hai) ke hone se just phle kuch task kr do ..
//and here hum iska use kr rhe hai data save hone ke just phle,password ko encrypt krne me.means data save hone ke just phle password ko encrypt krdo(use hash code me badal do)

userSchema.pre("save",async function (next){            //"pre" plugin means data save hone ke just phle kuch kro.and "post" plugin means data save hone ke just baad kuuch kro------
//like userScheme.pre("save",async function (next){here write the code ki krna kya hai})
    if(this.isModified("password")){        
        this.password=await bcrypt.hash(this.password,10)
        next()
    }
    else{
        return next();
    }
})


 //check krta hai ki user ne jo password dia hai and DB ka password, dono same hai ki nahi-----------
userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)         //it returns value in true and false----------
}



//generating access token----------
userSchema.methods.generateAccessToken = function(){        //we have method of generating token......DB.methods.generateAccessToken/generateRefreshToken=function(){ yha token bnake usse return krdo}------------

    return jwt.sign(            //jwt token generate hone par usse return kr do-----------
        //3 chije deni hongi yha..access token generate krne ke liye-------------payload,access token,expiry------------
        {
            _id: this._id,
            email: this.email,
            username: this.username,            //payload section----------
            fullName: this.fullName
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
//generating refresh token---------------------------
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
