import userController from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router()

router.post("/", userController.createUserController)
router.get("/:id", userController.findUserByIdController)
router.get("/", userController.findAllUsersController)
router.patch("/:id", userController.updateUserController)
router.delete("/:id", userController.deleteUserController)

export default router