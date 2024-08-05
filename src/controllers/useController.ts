import { Request,Response } from "express";
import { date, z,  } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"

const  UserSchema  = z.object({

    email:z.string().email("the email is not in the correct format").toLowerCase(),

})






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