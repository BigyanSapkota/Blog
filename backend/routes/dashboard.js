import express from 'express'
import { isAdmin } from '../middleware/Admin.js'
import { Getalldata, getUser, Userdelete } from '../controllers/dashboard.js'

const dashboardRoute=express.Router()

dashboardRoute.get('/',isAdmin,Getalldata)
dashboardRoute.get('/users',isAdmin,getUser) 
dashboardRoute.delete('/deleteuser/:id',isAdmin,Userdelete)


export default dashboardRoute