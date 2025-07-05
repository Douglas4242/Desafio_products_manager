import productService from "../services/product.service.js";


async function createProductController(req, res) {

    const newProduct = req.body 

    try {
        const createdProduct = await productService.createProductService(newProduct)
        res.status(201).send({createdProduct})
    } catch (err) {
        res.status(400).send(err.message)
    }
    
}

async function findAllProductsController(req, res) {
    try {
        const products = await productService.findAllProductsService()
        res.status(200).send({products})
    } catch (err) {
        res.status(400).send(err.message)
    }
}

async function updatedProductController(req, res) {
    const {id} = req.params
    const newProduct = req.body

    try {
        const updatedProduct = await productService.updateProductService(id, newProduct)
        res.status(200).send({updatedProduct})
    } catch (err) {
        res.status(400).send(err.message)
    }
    
}

export default {
    createProductController,
    findAllProductsController,
    updatedProductController
}