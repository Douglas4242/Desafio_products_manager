import db from "../config/database.js"

db.run(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price FLOAT NOT NULL
    )
`)

function createProductRepository (newProduct) {
    return new Promise ((resolve, reject) => {
        const {name, description, category, price} = newProduct

        db.run(`
            INSERT INTO products (name, description, category, price)
            VALUES (?, ?, ?, ?)
            `, [name, description, category, price],
        function (err, row) {
            if(err) {
                reject(err)
            } else {
                resolve({id: this.lastId, ...newProduct})
            }
        })
    })

}

function findProductByNameRepository (name) {
    return new Promise ((resolve, reject) => {
        db.get(`
            SELECT id, name, description, category, price FROM products
            WHERE name = ?
            `,[name],
            (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
    })
}

function findProductByIdRepository (id) {
    return new Promise ((resolve, reject) => {
        db.get(`
            SELECT id, name, description, category, price FROM products
            WHERE id = ?
            `,[id],
            (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
    })
}

function findAllProductsRepository () {
    return new Promise ((resolve, reject) => {
        db.all(`
            SELECT * FROM products
            `,[],
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
    })
}

function updateProductRepository (id, newProduct) {
    return new Promise ((resolve, reject) => {
        const {name, description, category, price} = newProduct
        const fields = ["name", "description", "category", "price"]
        let query = "UPDATE products SET "
        let values = []

        fields.forEach((field)=> {
            if (newProduct[field] != undefined) {
                query += `${field} = ? ,`
                values.push(newProduct[field])
            }
        })

        query = query.slice(0, -1)

        query += "WHERE id = ?"
        values.push(id)

        console.log(query)
        db.run(query, values, (err) => {
            if (err) {
                reject (err)
            } else {
                resolve({...newProduct, id})
            }
        })
    })
}


function deleteProductRepository (id, product) {
    return new Promise ((resolve, reject) => {

        const {name, description, category, price} = product


        db.run(`
            DELETE FROM products
            WHERE id = ?
            `, [id],
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ message: `product: ${name}, ${description},id: ${id}, was successfully deleted` })
                }
            })
    })
}

function findProductByCategoryRepository (category) {
    return new Promise ((resolve, reject) => {
        db.all(`
            SELECT * FROM products
            WHERE category = ?
            `, [category],
            (err, rows) => {    
                if (err) {
                    reject(err)
                }else {
                    resolve(rows)
                }
            })
    })
}

function searchProductByNameRepository (name) {
    return new Promise ((resolve, reject) => {

        db.all(`
            SELECT * FROM products
            WHERE name LIKE ?
            `, [`%${name}%`], 
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
    })
}



export default {
    createProductRepository,
    findProductByNameRepository,
    findProductByIdRepository,
    findAllProductsRepository,
    updateProductRepository,
    deleteProductRepository,
    findProductByCategoryRepository,
    searchProductByNameRepository
}