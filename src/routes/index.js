import { Router } from "express";
import userRouter from "./user.routes.js"

const routers = Router()

routers.use("/users", userRouter)

export {routers}