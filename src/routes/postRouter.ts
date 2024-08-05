
import  express from "express"

import type {Request,Response} from "express"
import { login, signup } from "../controllers/authController"
import { AuthMiddleware } from "../middlewares/authMiddleware"




export const  postRoute =  express.Router()

