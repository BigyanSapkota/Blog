import postModel from "../models/Blog.js"
import commentModel from "../models/comments.js"
import userModel from "../models/user.js"



const addComment= async(req,res)=>{
    try{
        const {postId,userId,comment}=req.body
        const newComment = new commentModel({
            postId,
            userId,
            comment
        })
        await newComment.save()

        // console.log('postId:', postId);

        const existpost = await postModel.findById(postId)
        if (!existpost){
            return res.status(404).json({success:false,message:"Post not found"})
        }
        existpost.comments.push(newComment._id)
        await existpost.save()
        // return res.status(200).json({success:true,message:"Comment Added Successfully",comment:newComment})


        
        // Get the updated number of comments
    const numberOfComments = existpost.comments.length;

    // Respond with success, the new comment, and the comment count
    return res.status(200).json({
      success: true,
      message: "Comment Added Successfully",
      comment: newComment,
      numberOfComments: numberOfComments,  // Include the number of comments
    });



    }catch(error){
       console.log(error)
       return res.status(500).json({success:false,message:"Server Error"})
    }
}
export {addComment}


const deleteComment= async(req,res)=>{
  try{
     const {commentId,postId}=req.body
     const userId = req.user._id;
     
       // Step 1: Find the comment to delete
    const commentToDelete = await commentModel.findById(commentId);
    if (!commentToDelete) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

       // Step 2: Check if the logged-in user is the owner of the comment
       if (commentToDelete.userId.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: "Unauthorized: You are not allowed to delete this comment" });
      }



     //3. delete comment from the comments collection
     const deleteComment=await commentModel.findByIdAndDelete(commentId)
     if (!deleteComment){
        return res.status(404).json({success:false,message:"Comment not found"})
     }


     //4. find the post and remove the comment 
      const existpost = await postModel.findById(postId)
      if (!existpost){
        return res.status(404).json({success:false,message:"Post not found"})
      }

      //5. Remove the commentId from the posts comments array
      existpost.comments = existpost.comments.filter(comment=>comment.toString() !== commentId)

      // save the updated post
      await existpost.save()
      return res.status(200).json({success:true,message:'Comment deleted Successfully', deleteComment:deleteComment})

  }catch(error){
    console.log(error)
    return res.status(500).json({success:false,message:"Server Error"})
  }
}
export {deleteComment}
