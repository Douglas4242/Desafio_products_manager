import productController from "../controllers/product.controller.js";
import { Router } from "express";

const router = Router ()


router.get("/", productController.findAllProductsController)
router.post("/", productController.createProductController)
router.put("/:id", productController.updatedProductController)
router.delete("/:id", productController.deleteProductController)

export default router
