import {express, userRouter } from './controller/userController.js'
import path from 'path'
import {prodRouter} from './controller/prodController.js'
// import { connection as db } from './config/index.js'
// //CREATE TOKEN
// import {createToken} from './middleware/AuthenticateUser.js'
// //ENCRIPTYING PASSWORD
// import {compare, hash} from 'bcrypt'
// //when registering a user/ eg=req.body
// import bodyParser from 'body-parser'

//create express

const app = express()
const port = +process.env.PORT || 4000

//Middleware  - process that happens between request and response
app.use('/users', userRouter)
app.use('/products', prodRouter)
app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true
}))


//Endpoint for homepage
//eg. localhost:3001, ('^/$|eShop') = the user will be able write eshop or not on the url
app.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})


// // Endpoint for users
// router.get('/users', (req,res) => {
//     try{
//         const strQry = `
//         SELECT fistName, lastName, age, emailAdd, userRole, profileURL
//         FROM Users;
//         `
//         db.query(strQry, (err, results) => {
//             if(err) throw new Error(err)
//             res.json({
//                 status: res.statusCode,
//                 results
//             })
//         })
//     } catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// })


// //endpoint for user
// router.get('/user/:id', (req, res) => {
//     try {
//         const strQry = `
//         SELECT userID, fistName, lastName, age, emailAdd, userRole, profileURL
//         FROM Users
//         WHERE userID = ${req.params.id};
//         `
//         db.query(strQry, (err, result) => {
//             if (err) throw new Error('Issue when retrieving a user.')
//             res.json({
//                 status: res.statusCode,
//                 result: result[0]
//             })
//         })
//     } catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// })


// //edpoint for updating users
// router.patch('/users/:id', async (req,res) => {
//     try{
//         let data = req.body
//         if (data.pwd) {
//             data.pwd = await hash(data.pwd, 12)
//         }
//         const strQry = `
//         UPDATE Users
//         SET ?
//         WHERE userID = ${req.params.id};`
//         // db.query = running the query
//         db.query(strQry, [data], (err) => {
//             if (err) throw new Error (err)
//             res.json({
//             status: res.statusCode,
//             msg: 'The user record was updated'
//         })
//         })
//     } catch (e) {
//         res.json({
//             status: 400,
//             msg: e.message
//         })
//     }
// })


// //register a user
// router.post('/register', async (req, res) => { //controller
//     try { //model
//         let data = req.body
//         data.pwd = await hash(data.pwd, 12)
//         // Payload
//         let user = {
//             emailAdd: data.emailAdd,
//             pwd: data.pwd
//         }
//         let strQry = `
//         INSERT INTO Users
//         SET ?;
//         `
//         db.query(strQry, [data], (err) => {
//             if (err) {
//                 res.json({
//                     status: res.statusCode,
//                     msg: 'This email has already been taken'
//                 })
//             } else {
//                 const token = createToken(user)
//                 res.json({
//                     token,
//                     msg: 'You are now registered.'
//                 })
//             }
//         })
//     } catch (e) {
//         // 'Unable to add a new user.'
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// })


// //login a user
// router.post('/login', (req, res) => {
//     try{
//         const {emailAdd, pwd} = req.body
//         const strQry = `
//         SELECT userID, fistName, lastName, age, emailAdd, pwd, userRole, profileURL
//         FROM Users
//         WHERE emailAdd = '${emailAdd}'`
//         db.query(strQry, async(err, result) => {
//             if (err) throw new Error ('To login please review')
//                 if(!result?.length) {
//                     res.json(
//                         {
//                             status: 401,
//                             ms: 'You provided a wrong email'
//                         }
//                     )
//                 } else {
//                     const  isValidPass = await compare(pwd, result[0].pwd)
//                     if(isValidPass) {
//                         const token = createToken({
//                             emailAdd,
//                             pwd
//                         })
//                         res.json({
//                             status: res.statusCode,
//                             token,
//                             results: result[0]
//                         })
//                     } else {
//                         res.json({
//                             status: 401,
//                             msg: 'Invalid password or you have not registered'
//                         })
//                     }
//                 }
//         })
//     } catch (e) {
//         req.json ({
//             status: 404,
//             msg: e.message
//         })
//     }
// })


// //delete a user
// router.delete('/user/:id', (req, res) => {
//     try{
//         const strQry = `
//         DELETE  
//         FROM Users
//         WHERE userID= ${req.params.id};
//         `
//         db.query(strQry, (err) => {
//             if (err) throw new Error('To delete a user, please review your delete query.')
//             res.json({
//                 status: res.statusCode,
//                 msg: 'A user\'s information was removed'
//             })
//         })
//     } catch (e){
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// })


//when the user want to insert an endpoint thats not included

app.get('*', (req,res) => {
    res.json({
        status: 400,
        msg: 'resource not found'
    })
})


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
//  listen = is assigning port number to server

