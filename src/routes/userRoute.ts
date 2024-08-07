import  express from "express"
import { forgotPassword, getAllUser, resetPassword, userUpdate } from "../controllers/userController"



export const userRoute =  express.Router()

userRoute.get("/",getAllUser)
userRoute.put('/update',userUpdate)

userRoute.post("/forgotPassword",forgotPassword)
userRoute.put("/resetPassword/:token",resetPassword)