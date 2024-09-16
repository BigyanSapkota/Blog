import express from 'express'
import { creatPost, deletePost, getPosts, update } from '../controllers/Blog.js'
import { isAdmin } from '../middleware/Admin.js'
import upload from '../middleware/Multer.js'


const BlogRoutes = express.Router()


BlogRoutes.post('/create',upload.single('postimage'),isAdmin,creatPost)
BlogRoutes.delete('/delete/:id',isAdmin,deletePost)
BlogRoutes.get('/getposts',getPosts)
BlogRoutes.patch('/update/:id',upload.single('postimage'),isAdmin,update)


export default BlogRoutes