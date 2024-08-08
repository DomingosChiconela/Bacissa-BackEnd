
import  express from "express"
import { getAllUser } from "../controllers/userController"
import { AuthMiddleware } from "../middlewares/authMiddleware"
import { RoleMiddleware } from "../middlewares/roleMiddleware"


export const  adminRoute =  express.Router()



adminRoute.get('/user',AuthMiddleware,RoleMiddleware,getAllUser)
adminRoute.put('/user/:id',AuthMiddleware,RoleMiddleware,getAllUser)
