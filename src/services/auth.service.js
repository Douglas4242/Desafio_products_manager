import jwt from "jsonwebtoken"
import "dotenv/config"
import userRepositories from "../repositories/user.repositories.js"
import bcrypt from "bcrypt"

function generateJWT(id){
    return jwt.sign({id}, process.env.SECRET_JWT, {expiresIn: 86400})
}

export {
    generateJWT
}