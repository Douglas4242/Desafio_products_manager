import userRepositories from "../repositories/user.repositories.js";
import bcrypt from "bcrypt"
import {generateJWT} from "./auth.service.js"

async function createUseService(newUser) {
    const foundEmail = await userRepositories.findUserByEmail(newUser.email)
    
    if (foundEmail) throw new Error ("Email already in use")
    
    //senha com hash
    const hashPass = await bcrypt.hash(newUser.password, 10)

    const user = await userRepositories.createUserRepository({...newUser, password: hashPass})

    if (!user) throw new Error ("Error creating user")
    
    //fazer o token de validação
    
    const token = generateJWT(user.id)
    
    return token
}


async function findAllUsersService() {
    const users = await userRepositories.findAllUsersRepository()
    return users
    
}

async function findUserByIdService(id) {
    const user = await userRepositories.findUserByIdRepository(id)
    if (!user) throw new Error ("User not found")

    return user
}

async function updateUserService(id, newUser) {
    const user = await findUserByIdService(id)

    const updatedUser = userRepositories.updateUserRepository(id, newUser)

    return updatedUser
    
}

async function deleteUserService(id) {
    const user = await findUserByIdService(id)
       
    const {message} = await userRepositories.deleteUserRepository(id, user.username)

    return message
    
}


export default {
    createUseService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    deleteUserService
}