import express from 'express'
import { getSinglePost } from '../controllers/public.js'

const publicRoutes= express.Router()


publicRoutes.get('/singlepost/:id',getSinglePost)


export default publicRoutes 