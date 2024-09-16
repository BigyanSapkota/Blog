import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        require:true,
        enum:['admin','user'],
        default:'user',
    }
},{timestamp:true})
const userModel=mongoose.model("Users",userSchema)

export default userModel