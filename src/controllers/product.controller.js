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

async function deleteProductController(req, res) {
    const {id} = req.params

    try {
        const message = await productService.deleteProductService(id)
        res.status(200).send(message)
    } catch (err) {
        res.status(400).send()
    }
}

async function findProductByCategoryController(req, res) {
    const {category} = req.params

    try {
        const products = await productService.findBookByCategoryService(category)
        res.status(200).send({products})
    } catch (err) {
        res.status(400).send(err.message)
    }
    
}

async function searchProductByNameController(req, res) {
    const name = req.query.name

    try {
        const products = await productService.searchProductByNameService(name)
        res.status(200).send({products})
    } catch (err) {
        res.status(400).send(err.message)
    }
    
}

export default {
    createProductController,
    findAllProductsController,
    updatedProductController,
    deleteProductController,
    findProductByCategoryController,
    searchProductByNameController
}