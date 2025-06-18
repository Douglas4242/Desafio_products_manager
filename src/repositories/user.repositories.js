import db from "../config/database.js"

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT
    )
    `)

function createUserRepository (newUser) {
    return new Promise ((resolve, reject) => {
        const {username, email, password, avatar} = newUser

        db.run(`
            INSERT INTO users (username, email, password, avatar)
            VALUES (?, ?, ?, ?)
            `, 
            [username, email, password, avatar],
          function (err) {
            if (err) {
                reject(err)
            } else {
                resolve({id: this.lastID, ...newUser})
            }
        })
    })
}

function findAllUsersRepository () {
    return new Promise ((resolve, reject) => {
        db.all(`
            SELECT id, username, email, avatar FROM users
            `,
        [],
        (err, rows) => {
            if (err) {
                reject(err)
            } else (
                resolve(rows)
            )
        })
    })
}

function findUserByEmail (email) {
    return new Promise ((resolve, reject) => {
        db.get(`
            SELECT id, username, email, avatar FROM users 
            WHERE email = ?
            `,
        [email],
        (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

function findUserByIdRepository (id) {
    return new Promise ((resolve, reject) => {
        db.get(`
            SELECT username, email, avatar FROM users
            WHERE id = ?
            `, [id],
        (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

function updateUserRepository (id, updatedUser) {
    return new Promise ((resolve, reject) => {
        const {username, email, password, avatar} = updatedUser
        const fields = ['username', 'email', 'passoword', 'avatar']
        let query = 'UPDATE users SET '
        const values = []

        fields.forEach((field) => {
            if(updatedUser[field] !== undefined) {
                query += `${field} = ?,`
                values.push(updatedUser[field])
            }
        })

        query = query.slice(0, -1)


        query += " WHERE id = ?"
        values.push(id)

        db.run(query, values, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve({...updatedUser, id})
            }
        })
    })
}

function deleteUserRepository (id, username) {
    return new Promise ((resolve, reject) => {
        db.run(`
            DELETE FROM users
            WHERE id = ?
            `,
            [id],
        (err) => {
            if (err) {
                reject(err)
            } else {
                resolve({message: `User: ${username} was deleted`})
            }
        })
    })
}

export default {
    createUserRepository,
    findAllUsersRepository,
    findUserByEmail,
    findUserByIdRepository,
    updateUserRepository,
    deleteUserRepository

}