import express, { urlencoded } from "express"
import * as dotenv  from "dotenv"
import { authRoute } from "./routes/authRoute"


dotenv.config()
const app  =   express()

const port =  process.env.PORT

app.use(express.json())

app.use(urlencoded({extended:true}))


app.use('/api/auth',authRoute)
//app.use('/api/auth')


app.listen(port , ()=>{

console.log(` servidor rodando em http://localhost:${port}`)
})



 