import  express from 'express'
import { addComment, deleteComment } from '../controllers/Comments.js'
import { isLogin } from '../middleware/auth.js'


const commentRoutes=express.Router()


commentRoutes.post('/addcomment',isLogin,addComment)
commentRoutes.delete('/deletecomment',isLogin,deleteComment)

export default commentRoutes