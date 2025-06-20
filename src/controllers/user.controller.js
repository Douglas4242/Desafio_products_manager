import userService from "../services/user.service.js";
import {loginService} from "../services/auth.service.js"

async function createUserController(req, res) {
    const newUser = req.body
    
    try {
        const token = await userService.createUseService(newUser)
        res.status(201).send({token})
    } catch (err) {
        res.status(400).send(err.message)
    }
}

async function loginUserController(req, res) {
    const {email, password} = req.body
    try {
        const token = await loginService(email, password)
        res.status(200).send({token})
    } catch (err) {
        res.status(400).send(err.message)
    }
    
}

async function findAllUsersController(req, res) {
    try {
        const users = await userService.findAllUsersService()
        res.status(200).send({users})
    } catch (err) {
        res.status(400).send(err.message)
    }
}

async function findUserByIdController(req, res) {
    const {id} = req.params
    try {
        const user = await userService.findUserByIdService(id)
        res.status(200).send({user})
    } catch (err) {
        res.status(404).send(err.message)
    }
}

async function updateUserController(req, res) {
    const {id} = req.params
    const newUser = req.body

    try {
        const updatedUser = await userService.updateUserService(id, newUser)
        res.status(201).send({updatedUser})
    } catch (err) {
        res.status(400).send(err.message)
    }
    
}


async function deleteUserController(req, res) {
    const {id} = req.params

    try {
        const message = await userService.deleteUserService(id)
        res.status(200).send(message)
    } catch (err) {
        res.status(400).send(err.message)
    }
    
}

export default {
    createUserController,
    findAllUsersController,
    findUserByIdController,
    updateUserController,
    deleteUserController,
    loginUserController
}