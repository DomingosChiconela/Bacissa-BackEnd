import { Request,Response } from "express";
import { date, z,  } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"
import { v4 as uuidv4 } from 'uuid';

import { checkPassword, encryptPassword } from "../utils/cryptPassword";
import { sendEmail } from "../utils/email";
import { signupSchema } from "./authController";

const  UserSchema  = z.object({

    email:z.string().email("the email is not in the correct format").toLowerCase(),

})

const userSchema = z.object({


    name:z.string(),
    email:z.string().email("O email e obrgatorio").toLowerCase(),
   
})


const forgotSchema=  signupSchema.pick({
    email:true,
  })
  const resetSchema=  signupSchema.pick({
    password:true
    
  })





export const  getAllUser = async(req:Request , res:Response)=>{

    try{

        const allUser = await db.user.findMany({
            select:{
               id:true,
               email:true,
               role:true,
               createdAt:true ,
               updatedAt:true,

               profile:{
                  select:{
                    name:true
                  }
               }

            }
        })

        res.status(200).json({message:"All User",data:allUser})


    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }



}






export const  userUpdate =   async (req:Request,res:Response)=>{

    const id  =  req.params.id 


    try{
        const validation = UserSchema.safeParse(req.body);
        if(!validation.success){
            return  res.status(400).json({message:fromZodError(validation.error).details})
        }


        const userUpdate  = await db.user.update({
                    where:{id},
                    data:{email:validation.data.email }

                })


        res.status(200).json({message:"user updated",data:userUpdate})
        

    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }

                

}
export const forgotPassword =  async  (req: Request, res: Response) => {

    const validation = forgotSchema.safeParse(req.body);

    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }


    try{

       const  existingUser =  await db.user.findUnique({
            where:{email:validation.data.email}
        })

        if (!existingUser) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const token = uuidv4();
        const updatedUser  = await  db.user.update({
            where:{
                id:existingUser.id
            },
            data:{
                token 
            }

        })
        
        await sendEmail(existingUser.email,token)

        return res.status(200).json({ message: "email sent", data:updatedUser });

    } catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
        

}


export const  resetPassword =  async  (req: Request, res: Response) => {
     const {token} = req.params
     if(!token){
        return  res.status(400).json({message:"token is required"})
     }

    const validation = resetSchema.safeParse(req.body);

    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }

    const passwordHash  =  await encryptPassword (validation.data.password)

    try{

         
        const existingUser = await db.user.findUnique({
            where: {token}
        });

        if (!existingUser) {
            return res.status(404).json({ message: "The token is incorrect or has already been used, request a new one" });
        }

        const userUpdated =  await db.user.update({
            where:{token},
            data:{
                password:passwordHash,
                token: " "
            }
})


        return res.status(200).json({message:"Password reset",data:userUpdated})

     

    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }

        

}



