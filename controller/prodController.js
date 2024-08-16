import express from 'express'
import bodyParser from 'body-parser'
import {products} from '../model/products'

const prodRouter =  express()
prodRouter.use(bodyParser.json())

prodRouter.get('/', (req, res) => {
    products.fetchProducts(req, res)
})

prodRouter.get('/:id', (req, res) => {
    products.fetchProduct(req, res)
})

prodRouter.post('/add', (req, res) => {
    products.addProduct(req, res)
})

prodRouter.patch('/product/:id', (req, res) => {
    products.deleteProduct(req, res)
})

prodRouter.delete('/product/:id', (req, res) => {
    products.deleteUser(req,res)
})

