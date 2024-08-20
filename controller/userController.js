import express from 'express'
import bodyParser from 'body-parser'
import { users } from '../model/index.js'
// import { verifyAToken } from '../middleware/AuthenticateUser.js'


const userRouter =  express()
userRouter.use(bodyParser.json())

userRouter.get('/',  (req, res) => {
    users.fetchUsers(req, res)
})

userRouter.get('/:id',  (req, res) => {
    users.fetchUser(req, res)
})

userRouter.post('/register', (req, res) => {
    users.registerUser  (req, res)
})

userRouter.patch('/:id',  (req, res) => {
    users.updateUser(req, res)
})

userRouter.delete('/:id',  (req, res) => {
    users.deleteUser(req,res)
})

userRouter.post('/login', (req, res) => {
    users.loginUser(req, res)
})

export{
    express,
    userRouter
}