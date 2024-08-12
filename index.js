import express from 'express'
import path from 'path'
import { connection as db } from './config/index.js'
//CREATE TOKEN
import {createToken} from './middleware/AuthenticateUser.js'
//ENCRIPTYING PASSWORD
import {hash} from 'bcrypt'
//when registering a user 
import bodyParser from 'body-parser'

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

router.use(bodyParser.json())


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


// endpoint for updating products
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


//edpoint for updating users
router.patch('/users/:id', async (req,res) => {
    try{
        let data = req.body

        if (data.pwd) {
            data.pwd = await hash(data.pwd, 12)
        }
        const strQry = `
        UPDATE Users
        SET ?
        WHERE userID = ${req.params.id};`
        // db.query = running the query
        db.query(strQry, [data], (err) => {
            if (err) throw new Error (err)
            res.json({
            status: res.statusCode,
            msg: 'The user record was updated'
        })
        })
    } catch (e) {
        res.json({
            status: 400,
            msg: e.message
        })
    }
})


//register a user
router.post('/register', async(req,res) => {
    try{    
        let data = req.body
        data.pwd = await hash(data.pwd, 12)
        //payload
        let user = {
            emailAdd: data.emailAdd,
            pwd: data.pwd
        }
        // SET = sending data in a array
        let strQry = `
        INSERT INTO Users
        SET ?;
        `
        db.query(strQry, [data], (err) =>{
            if (err){
                res.json({
                    //when the user entered an already account 
                    status: res.statusCode,
                    msg: 'This email already been  taken'
                })
            }
        })
    } catch (e) {
        const token = createToken(user)
        res.json({
            token,
            msg: 'You are now registered'
        })
    }
})


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