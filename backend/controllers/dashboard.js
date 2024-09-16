import postModel from "../models/Blog.js"
import userModel from "../models/user.js"
import fs from 'fs'
import path from "path"

const Getalldata=async(req,res)=>{
    try{
       const Users = await userModel.find()
       const Posts = await postModel.find()

       if(!Users && !Posts){
        return res.status(404).json({success:false,message:"No data found"})
       }
       return res.status(200).json({success:true,Users,Posts})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Server Error"})
    }
}
export {Getalldata}


const getUser=async(req,res)=>{
    try{
        const Users = await userModel.find()
 
        if(!Users){
         return res.status(404).json({success:false,message:"No data found"})
        }
        return res.status(200).json({success:true,Users})
 
     }catch(error){
         console.log(error)
         return res.status(500).json({success:false,message:"Server Error"})
     }
}
export {getUser}


const Userdelete=async(req,res)=>{
    try{
      const userId = req.params.id
      const existUser= await userModel.findById(userId)
      if(!existUser){
        return res.status(404).json({success:false,message:"NO user found"})
      }
      if (existUser.role == 'admin'){
        return res.status(404).json({success:false,message:"Sorry! Admin account cannot be deleted"})
      }

      if (existUser.profile){
        const profilepath=path.join('public/images',existUser.profile)
        fs.promises.unlink(profilepath)
        .then(()=> console.log('Profile image deleted successfully'))
        .catch(error => console.log('Error occur on deleting post image',error))
      }


      const deleteUser = await userModel.findByIdAndDelete(userId)

      return res.status(200).json({success:true,message:"User Successfully deleted",user:deleteUser})
    }catch(error){

    }
}
export {Userdelete}
