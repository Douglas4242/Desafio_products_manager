import userController from "../controllers/user.controller.js";
import { Router } from "express";
import { authMiddelware } from "../middlewares/auth.meddleware.js";
import { validate, validateUserId } from "../middlewares/validation.middleware.js";
import { userSchema } from "../schemas/user.schemas.js";

const router = Router()


router.post("/login/", userController.loginUserController)
router.post("/", validate(userSchema), userController.createUserController)

router.use(authMiddelware)

router.get("/:id", validateUserId, userController.findUserByIdController)
router.get("/", userController.findAllUsersController)
router.patch("/:id", validateUserId, userController.updateUserController)
router.delete("/:id", validateUserId, userController.deleteUserController)

export default router