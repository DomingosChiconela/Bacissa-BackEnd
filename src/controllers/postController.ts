import { Request,Response } from "express";
import {  z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"




const postSchema  =  z.object({
 //   z.preprocess((val) => parseFloat(parseFloat(val as string).toFixed(2)), z.number().positive())
    image :z.string().optional(),
    quantity:z.number().positive() ,
    latitude: z.string(),
    logitude:z.string(),
    residueId:z.string()

})





export  const createPost = async (req:Request,res:Response)=>{
    const userid =  req.userId
    const validation = postSchema.safeParse(req.body);
    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }

    try{
        const newPost = await db.post.create({
            data:{
                quantity:validation.data.quantity,
                latitude:validation.data.latitude,
                logitude:validation.data.logitude,
                residueId: validation.data.residueId,
                userId:userid
                


            },
        })

        res.status(201).json({message:"Post created",data:newPost})
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });

    }


}



export const  getAllPost = async(req:Request , res:Response)=>{

    try{

        const allPost = await db.post.findMany()

        res.status(200).json({message:"All posts",data:allPost})


    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }



}







