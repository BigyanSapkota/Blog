import mongoose from "mongoose";
import userModel from "./user.js";


const postSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    image:{
        type:String,
    },
    postedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true ,
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comments",
        default: []
    }]
},{timestamps:true})

const postModel = mongoose.model("Posts",postSchema)


export default postModel