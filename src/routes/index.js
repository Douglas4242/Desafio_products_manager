import { Router } from "express";
import userRouter from "./user.routes.js"
import productRouter from "./product.routes.js"

const routers = Router()


routers.use("/users", userRouter)
routers.use("/products", productRouter)

export {routers}