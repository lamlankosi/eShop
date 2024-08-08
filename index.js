import express from 'express'
import path from 'path'
import { connection as db } from './config/index.js'


//create express
const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()


//Middleware  - process that happens between request and response
app.use(router, 
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true
}))

//Endpoint for homepage
//eg. localhost:3001, ('^/$|eShop') = the user will be able write eshop or not on the url
router.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})
// Endpoint for users
router.get('/users', (req,res) => {
    try{
        const strQry = `
        SELECT fistName, lastName, age, emailAdd
        FROM Users;
        `
        db.query(strQry, (err, results) => {
            if(err) throw new Error(err)
            res.json({
                status: res.statusCode,
                results
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
})
// endpoint for updating 
router.patch('/product/:id', (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;
        const strQry = `
        UPDATE Products
        SET prodName = ?, productDescription = ?, productPrice = ?
        WHERE productID = ?;
        `;
        db.query(strQry, [productName, productDescription, productPrice, req.params.id], (err, results) => {
            if (err) throw new Error(err);
            res.json({
                status: res.statusCode,
                results
            });
        });
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        });
    }
});

//when the user want to insert an endpoint thats not included
router.get('*', (req,res) => {
    res.json({
        status: 400,
        msg: 'resource not found'
    })
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
//  listen = is assigning port number to server