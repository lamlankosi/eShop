import express from 'express'
import bodyParser from 'body-parser'
import {products} from '../model/index.js'
// import { verifyAToken } from '../middleware/AuthenticateUser.js'

const prodRouter =  express.Router()
prodRouter.use(bodyParser.json())

prodRouter.get('/',   (req, res) => {
    products.fetchProducts(req, res)
})

prodRouter.get('/recent', (req,res) => {
    products.recentProducts(req,res)
})

prodRouter.get('/:id',  (req, res) => {
    products.fetchProduct(req, res)
})


prodRouter.post('/add',  (req, res) => {
    products.addProduct(req, res)
})

prodRouter.patch('/:id', (req, res) => {
    products.updateProduct(req, res)
})

prodRouter.delete('/:id', (req, res) => {
    products.deleteProducts(req,res)
})

export {
    prodRouter
}
