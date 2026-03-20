import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()
await connectDB()

const app = express()
const PORT = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use(cors({
    credentials: true, 
    origin: process.env.FRONTEND_URL 
}))
app.use(cookieParser())

app.get("/", (req,res)=>{
    res.send("Server API is Working")
})

app.listen(PORT, ()=>{
    console.log(`API is Working in port http://localhost:${PORT}`)
})