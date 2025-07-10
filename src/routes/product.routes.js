import productController from "../controllers/product.controller.js";
import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { createProductSchema, updateProductSchema } from "../schemas/product.schemas.js";
import { authMiddelware } from "../middlewares/auth.meddleware.js";


const router = Router ()


router.get("/", productController.findAllProductsController)
router.get("/search", productController.searchProductByNameController)
router.get("/:category", productController.findProductByCategoryController)

router.use(authMiddelware)
router.post("/", validate(createProductSchema), productController.createProductController)
router.put("/:id", validate(updateProductSchema), productController.updatedProductController)
router.delete("/:id", productController.deleteProductController)



export default router
