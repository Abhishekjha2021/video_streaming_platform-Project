import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "npm i mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videoFile:{
        type:String,        //cloudinary url-----------
        required:true
    },

    thumbNail:{
        type:String,        //cloudinary url-----------
        required:true
    },

    title:{
        type:String,        
        required:true
    },

    description:{
        type:String,        
        required:true
    },

    duration:{
        type:Number,        //cloudinary url---------
        required:true
    },

    views:{
        type:Number,
        default:0
    },

    isPublished:{
        type:Boolean,        //cloudinary url-----------
        default:true
    },

    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }



},{timestamps:true,versionKey:false})

videoSchema.plugin(mongooseAggregatePaginate)  //plugin is a hook here ....read about mongoose hooks------

export const Video=mongoose.model("Video",videoSchema)