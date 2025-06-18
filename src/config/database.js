import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('library_db.sqlite', (err) => {
    if (err) {
        console.log("Error connecting to the database:", err.message)
    } else {
        console.log("Connnetion stablished to the database SQLite")
    }
})

export default db