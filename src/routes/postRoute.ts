
import  express from "express"

import type {Request,Response} from "express"

import { AuthMiddleware } from "../middlewares/authMiddleware"
import { uploadS3 } from "../middlewares/uploudMiddleware"




export const  postRoute =  express.Router()

