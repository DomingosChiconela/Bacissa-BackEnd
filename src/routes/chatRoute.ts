
import  express from "express"

import { login, signup } from "../controllers/authController"
import { createChat, getChatMessages, getMyChat, sendMessage } from "../controllers/chatcontroller"
import { AuthMiddleware } from "../middlewares/authMiddleware"



export const  chatRoute =  express.Router()



chatRoute.post("/",AuthMiddleware,createChat)
chatRoute.get("/",AuthMiddleware,getMyChat)
chatRoute.get("/:chatId",AuthMiddleware,getChatMessages)
chatRoute.post("/message",AuthMiddleware,sendMessage)