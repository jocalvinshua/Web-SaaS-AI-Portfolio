import express from "express"
import { isAuth, Login, Logout, Register } from "../controller/userController.js"
import authMiddleware from "../middleware/Auth.js"

const userRoute = express.Router()

userRoute.post("/login", Login)
userRoute.post("/register", Register)
userRoute.get("/is-auth", authMiddleware, isAuth)
userRoute.get("/logout", Logout)

export default userRoute;