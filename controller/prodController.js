import express from 'express'
import bodyParser from 'body-parser'
import {products} from '../model/products'
import { verifyAToken } from '../middleware/AuthenticateUser'

const prodRouter =  express.Router()
prodRouter.use(bodyParser.json())

prodRouter.get('/', verifyAToken, (req, res) => {
    products.fetchProducts(req, res)
})

prodRouter.get('/:id', verifyAToken, (req, res) => {
    products.fetchProduct(req, res)
})

prodRouter.get('/recent', (req,res) => {
    products.recentProducts(req,res)
})

prodRouter.post('/add', verifyAToken, (req, res) => {
    products.addProduct(req, res)
})

prodRouter.patch('/:id', verifyAToken, (req, res) => {
    products.updateProduct(req, res)
})

prodRouter.delete('/:id', verifyAToken, (req, res) => {
    products.deleteProduct(req,res)
})

export {
    prodRouter
}
