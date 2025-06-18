import express from "express"
import { routers } from "./src/routes/index.js"

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(routers)

app.listen(port, () => console.log(`Server running on port ${port}`))