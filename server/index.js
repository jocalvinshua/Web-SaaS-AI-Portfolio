import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoute from "./route/userRoute.js"
import resumeRouter from "./route/resumeRoute.js"

dotenv.config()
await connectDB()

const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(cookieParser())

app.get("/", (req,res)=>{
    res.send("Server API is Working")
})
app.use("/api/user", userRoute)
app.use("/api/resume", resumeRouter)

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
})

app.listen(PORT, ()=>{
    console.log(`API is Working in port http://localhost:${PORT}`)
})