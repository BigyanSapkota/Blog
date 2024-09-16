import postModel from "../models/Blog.js"
import fs from 'fs'
import path from "path"
import mongoose from "mongoose"
import userModel from "../models/user.js"

const creatPost = async(req,res)=>{
    try{
         
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
          }

       const {title,description}=req.body
       const imagePath=req.file.filename
       const createBlog = new postModel({
        title,
        description,
        image:imagePath,
        postedBy:req.user._id,
       })
       await createBlog.save()
       return res.status(200).json({success:true,message:"Post created successfully",post:createBlog})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Server Error"})
    }
}
export {creatPost}



const deletePost=async(req,res)=>{
    try{
      const postId=req.params.id

      const findPost=await postModel.findById(postId)
      if(!findPost){
        return res.status(404).json({success:false,message:"Post not found"})
      }

      // delete image file from the server or public folder
      if (findPost.image){
        const profilepath=path.join('public/images',findPost.image)
        fs.promises.unlink(profilepath)
        .then(()=> console.log('Post image deleted successfully'))
        .catch(error => console.log('Error occur on deleting post image',error))
      }


      const deletedPost= await postModel.findByIdAndDelete(postId)
      return res.status(200).json({success:true,message:"Post deleted Successfully",post:deletedPost})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Server Error"})
    }
}
export {deletePost}


// const deletePost = async (req, res) => {
//     try {
//       const postId = req.params.id;
  
//       // Check if postId is valid ObjectId if you're using MongoDB's _id
//       if (!mongoose.Types.ObjectId.isValid(postId)) {
//         return res.status(400).json({ success: false, message: "Invalid Post ID" });
//       }
  
//       const deletedPost = await postModel.findByIdAndDelete(postId);
  
//       if (!deletedPost) {
//         return res.status(404).json({ success: false, message: "Post not found" });
//       }
  
//       return res.status(200).json({ success: true, message: "Post deleted successfully", post: deletedPost });

//     } catch (error) { 
//       console.log(error);
//       return res.status(500).json({ success: false, message: "Server Error" });
//     }
//   };
  
//   export { deletePost };
  


  const getPosts= async (req,res)=>{
    try{
        const posts =await postModel.find()
        if (!posts){
            return res.status(404).json({success:false,message:"Posts not found"})
        }
        return res.status(500).json({success:true,posts})
    }catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
  }
  export {getPosts}



  const update= async(req,res)=>{
    try{
      const {title,description}=req.body
      const postId=req.params.id

      const postUpdate=await postModel.findById(postId)
      if (!postUpdate){
        return res.status(404).json({success:false,message:"Post not found"})
      }
       if(title){
        postUpdate.title=title
       }
       if (description){
        postUpdate.description=description
       }
       if (req.file){
        postUpdate.image=req.file.filename
       }
       await postUpdate.save()
       return res.status(200).json({success:true,message:"Post successfully updated",post:postUpdate})

    }catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
  }
  export {update}