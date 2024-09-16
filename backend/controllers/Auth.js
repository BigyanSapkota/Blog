import userModel from "../models/user.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'



const Register=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body
        const existUser=await userModel.find({email})
        if(!existUser){
          return res.status(303).json({success:false,message:"User already exist! Please login"})
        }
     
        const imagePath=req.file.filename
        const hashPassword=await bcryptjs.hashSync(password,10)
        const newUser= new userModel({
          fullName,
          email,
          password:hashPassword,
          profile:imagePath
        })
          await newUser.save()
          return res.status(200).json({success:true,message:"User has been successfully Register",user:newUser})
    }catch(error){
         console.log(error)
         return res.status(500).json({success:false,message:"Unable to regiser an user"})
    }
}
export {Register}


const Login=async(req,res)=>{
  try{ 
      const {email,password}=req.body
      if (!email || !password){
        return res.status(400).json({success:false,message: "Please fill all the fields"})
      }

      const findUser =await userModel.findOne({email})
      if (!findUser){
        return res.status(400).json({success:false,message:"No user found! Please Register"})
      }

      const comparePassword= await bcryptjs.compare(password,findUser.password)
      if (!comparePassword){
        return res.status(400).json({success:false,message:"Invalid Password"})
      }
      const token= jwt.sign({userId:findUser._id},process.env.JWT_SECREATE)

      // store token in cookie
      res.cookie('token',token,{
        httpOnly:true,
        secure:false,
        maxAge:3*24*60*60*1000
      })

      res.status(200).json({success:true,message:"Login Successfully",user:findUser,token})

  }catch(error){
      console.log(error)
      return res.status(500).json({success:false,message:"Server error occurs"})
  }
}
export {Login}



const Logout = async(req,res)=>{
  try{
       res.clearCookie('token')
       res.status(200).json({success:true,message:"Logout Successfully"})
  }catch (error){
      console.log(error)
      return res.status(500).json({success:false,message:"Server Error"})
  }
}
export {Logout}