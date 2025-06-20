import { userIdSchema } from "../schemas/user.schemas.js"


const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (err) {
        res.status(400).json({error: err.errors})
    }
}

const validateUserId = (req, res, next) => {
    try {
        const userId = +req.params.id
        userIdSchema.parse({userId: userId})
        next()
    } catch (err) {
        res.status(400).json({error: err.errors})
    }
}

export {validate, validateUserId}