import productsRepositories from "../repositories/products.repositories.js";

async function createProductService(newProduct) {
    
    const product = await productsRepositories.findProductByNameRepository(newProduct.name)
    
    if (product) throw new Error ("Product already exists")
    
    const createdProduct = await productsRepositories.createProductRepository(newProduct)

    return createdProduct
}

async function findAllProductsService() {
    const products = await productsRepositories.findAllProductsRepository()

    return products
    
}


async function findProductByIdService(id) {
    const product = await productsRepositories.findProductByIdRepository(id)
    
    if (!product) throw new Error ("Product does not exists")
    
    return product
    
}


async function updateProductService(id, newProduct) {

    const product = await productsRepositories.findProductByIdRepository(id)

    if (!product) throw new Error ("Product does not exists")

    const updatedProduct = await productsRepositories.updateProductRepository(id, newProduct)

    return updatedProduct

    
}

async function deleteProductService(id) {

    const product = await productsRepositories.findProductByIdRepository(id)

    
    
    if (!product) throw new Error ("Product does not exists")
        
        
        const {message} = await productsRepositories.deleteProductRepository(id, product)
        
        console.log(message)

    return message
    
}

async function findBookByCategoryService(category) {
    const products = await productsRepositories.findProductByCategoryRepository(category)


    return products
    
}

async function searchProductByNameService(name) {
    const products = await productsRepositories.searchProductByNameRepository(name)
    

    return products
    
}

export default {
    createProductService,
    findAllProductsService,
    findProductByIdService,
    updateProductService,
    deleteProductService,
    findBookByCategoryService,
    searchProductByNameService
}