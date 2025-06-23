import db from "../config/database.js"

db.run(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT
    name TEXT NOT NULL
    description TEXT NOT NULL
    category TEXT NOT NULL
    price INTEGER NOT NULL
    )
`)

