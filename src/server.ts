import express, { urlencoded } from "express"
import * as dotenv  from "dotenv"
import { authRoute } from "./routes/authRoute"
import { useRoute } from "./routes/userRoute"
import { residueRoute } from "./routes/residueRoute"


dotenv.config()
const app  =   express()

const port =  process.env.PORT

app.use(express.json())

app.use(urlencoded({extended:true}))


app.use('/api/auth',authRoute)

app.use('/api/use',useRoute)

app.use('/api/residue',residueRoute)





app.listen(port , ()=>{

console.log(` servidor rodando em http://localhost:${port}`)
})



 