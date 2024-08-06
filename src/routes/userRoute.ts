import  express from "express"
import { getAllUser, userUpdate } from "../controllers/userController"



export const userRoute =  express.Router()

userRoute.get("/",getAllUser)
userRoute.put('/update',userUpdate)


