import express from 'express'
import dotenv, { config } from 'dotenv'
dotenv.config()
import cors from 'cors'
import './utils/db.js'
import AuthRoutes from './routes/Auth.js'
import cookieParser from 'cookie-parser'
import BlogRoutes from './routes/blog.js'
import dashboardRoute from './routes/dashboard.js'
import commentRoutes from './routes/Comments.js'
import publicRoutes from './routes/public.js'



const PORT=process.env.PORT
const app=express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.static('public'))  //to access image publicly



app.use('/auth',AuthRoutes)
app.use('/blog',BlogRoutes)
app.use('/dashboard',dashboardRoute)
app.use('/comment',commentRoutes)
app.use('/public',publicRoutes)



app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`)
})