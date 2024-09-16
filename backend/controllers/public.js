import postModel from "../models/Blog.js"



const getSinglePost = async(req,res)=>{
    try{
        const postId =req.params.id
        const findPost = await postModel.findById(postId)
        .populate({
            path:'comments',
            populate:{
                path:"userId"
            }
        })

        if (!findPost){
            return res.status(404).json({success:false,message:'Post not found'})
        }
        return res.status(200).json({success:true,Post:findPost})
    }catch(error){ 
        console.log(error)
        return req.status(500).json({success:false,message:'Server Error'})
    }
}
export {getSinglePost}