import jwt from 'jsonwebtoken'
import userModel from '../models/user.js'

const isAdmin=async(req,res,next)=>{
    try{
    const token=req.cookies.token  //get token from cookie
     if(!token){
        return res.status(401).json({message:"Unauthorized ! User not login"})
     }
     //decode the token to find user id
     const decoded = jwt.verify(token,process.env.JWT_SECREATE)
     //find user from id
     const user = await userModel.findById(decoded.userId)
     
     if (!user){
        return res.status(403).json({message:"User not found !"})
     }
     if (user.role !== 'admin'){
        return res.status(403).json({success:false,message: 'Unauthorized: User is not Admin'})
     }
     req.user = user;
     next()

  
    } catch(error) {
       console.log(error)
       return res.status(500).json({success:false,message:'Server Error'})
    }
}
export {isAdmin}