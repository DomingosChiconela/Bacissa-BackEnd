import express, { urlencoded } from "express"
import * as dotenv  from "dotenv"
import { authRoute } from "./routes/authRoute"
import { userRoute } from "./routes/userRoute"
import { residueRoute } from "./routes/residueRoute"

import { Request,Response } from "express";
import { uploadS3 } from "./middlewares/uploudMiddleware"
import { profileRoute } from "./routes/profileRoute"
import { postRoute } from "./routes/postRoute"




dotenv.config()
const app  =   express()

const port =  process.env.PORT

app.use(express.json())

app.use(urlencoded({extended:true}))


app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/residue',residueRoute)
app.use('/api/profile',profileRoute)
app.use('/api/post',postRoute)






app.listen(port , ()=>{

console.log(` servidor rodando em http://localhost:${port}`)


})



 