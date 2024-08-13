import {connection as db } from '../config/index'
import { createToken } from '../middleware/AuthenticateUser.js'
import {compare, hash} from 'bcrypt'

class Users { //method
    fetchUsers(req, res) {
        try{
            const strQry = `
            SELECT fistName, lastName, age, emailAdd, userRole, profileURL
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
    }  

    fetchUser(req, res) {
        try {
            const strQry = `
            SELECT userID, fistName, lastName, age, emailAdd, userRole, profileURL
            FROM Users
            WHERE userID = ${req.params.id};
            `
            db.query(strQry, (err, result) => {
                if (err) throw new Error('Issue when retrieving a user.')
                res.json({
                    status: res.statusCode,
                    result: result[0]
                })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    async registerUser(req, res) {
        try { //model
            let data = req.body
            data.pwd = await hash(data.pwd, 12)
            // Payload
            let user = {
                emailAdd: data.emailAdd,
                pwd: data.pwd
            }
            let strQry = `
            INSERT INTO Users
            SET ?;
            `
            db.query(strQry, [data], (err) => {
                if (err) {
                    res.json({
                        status: res.statusCode,
                        msg: 'This email has already been taken'
                    })
                } else {
                    const token = createToken(user)
                    res.json({
                        token,
                        msg: 'You are now registered.'
                    })
                }
            })
        } catch (e) {
            // 'Unable to add a new user.'
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    async updateUser(req, res) {
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
    }

    deleteUser(req, res) {
        try{
            const strQry = `
            DELETE  
            FROM Users
            WHERE userID= ${req.params.id};
            `
            db.query(strQry, (err) => {
                if (err) throw new Error('To delete a user, please review your delete query.')
                res.json({
                    status: res.statusCode,
                    msg: 'A user\'s information was removed'
                })
            })
        } catch (e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    loginUser(req, res) {
        try{
            const {emailAdd, pwd} = req.body
            const strQry = `
            SELECT userID, fistName, lastName, age, emailAdd, pwd, userRole, profileURL
            FROM Users
            WHERE emailAdd = '${emailAdd}'`
            db.query(strQry, async(err, result) => {
                if (err) throw new Error ('To login please review')
                    if(!result?.length) {
                        res.json(
                            {
                                status: 401,
                                ms: 'You provided a wrong email'
                            }
                        )
                    } else {
                        const  isValidPass = await compare(pwd, result[0].pwd)
                        if(isValidPass) {
                            const token = createToken({
                                emailAdd,
                                pwd
                            })
                            res.json({
                                status: res.statusCode,
                                token,
                                results: result[0]
                            })
                        } else {
                            res.json({
                                status: 401,
                                msg: 'Invalid password or you have not registered'
                            })
                        }
                    }
            })
        } catch (e) {
            req.json ({
                status: 404,
                msg: e.message
            })
        }
    }
}

export {
    Users
}