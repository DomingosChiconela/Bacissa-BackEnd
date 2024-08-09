
import { Request,Response } from "express";
import {  z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"
import * as jwt from "jsonwebtoken"

const chatSchema  = z.object({
    

  creatorId : z.string(),
    
  invitedId:z.string(),
  content:z.string()
})


const sendMessageSchema =  z.object({
  content:z.string(),
  chatId:z.string()
})


export const createChat =  async (req: Request, res: Response) => {
  


  const  id  =  req.userId
const validation = chatSchema.safeParse(req.body);

  if (!validation.success) {
      return res.status(400).json({ message: fromZodError(validation.error).details });
  }

  try{


      const  newChat =  await db.chat.create({
        
          data:{
            creatorId:validation.data.creatorId,
            invitedId:validation.data.invitedId,
            message: {
              create: {
                content:validation.data.content,  
                senderId: validation.data.creatorId, 
                receiverId: validation.data.invitedId, 
              }
          }
          },
          include: {
            message: true, 
          }
      })


    res.status(201).json({message:"chat created",data:newChat})

} catch(error){
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });

}
}

export  const   getMyChat  =  async (req: Request, res: Response) => { 
  const {id}  = req.params



try{
      const userChats = await db.chat.findMany({
        where: {
          OR: [
            { creatorId:id },
            { invitedId: id},
          ],
        },
        include: {
          message: true, 
        },
      });

      if(!userChats){
        return  res.status(400).json({message:"chat not found"})
    }
    res.status(200).json({message:"chat found",data:userChats})
  } catch(error){
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });

}

}


export const getChatMessages = async (req: Request, res: Response) => {

  const UserId =  req.userId
  const { chatId } = req.params;

  try {
   
    const chat = await db.chat.findUnique({
      where: { id: chatId },
      include: {
        message: true, 
      },
    });

    if (!chat) {
      return res.status(404).json({
        message: 'Chat not found',
      });
    }

    return res.status(200).json({
      message: 'Chat messages retrieved successfully',
      data:{messages:chat.message, user:UserId} , 
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while fetching chat messages',
    });
  }
};


export const sendMessage =   async (req: Request, res: Response) => { 

      const senderId =  req.userId
      const validation = sendMessageSchema.safeParse(req.body);

  if (!validation.success) {
      return res.status(400).json({ message: fromZodError(validation.error).details });
  }


  try {
    
    const chatExists = await db.chat.findUnique({
      where: { id:validation.data.chatId },
    });

    if (!chatExists) {
      return res.status(404).json({
        message: 'Chat not found',
      });
    }
    const  receiverId = (chatExists.creatorId == senderId)?chatExists.invitedId:chatExists.creatorId
   
    const newMessage = await db.message.create({
      data: {
        content:validation.data.content,
        senderId:senderId,
        receiverId,
        chatId:validation.data.chatId,
      },
    });

    return res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while sending the message',
    });
  }
};






