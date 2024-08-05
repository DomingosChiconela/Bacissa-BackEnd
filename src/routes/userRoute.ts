import  express from "express"
import { userUpdate } from "../controllers/useController"



export const useRoute =  express.Router()


useRoute.put('/update',userUpdate)


