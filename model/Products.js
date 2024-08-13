import {connection as db } from '../config/index'
import { createToken } from '../middleware/AuthenticateUser.js'
import {compare, hash} from 'bcrypt'

class products {
    fetchProducts(req, res) {
        try{
            const strQry = `
            SELECT productID, prodName, category, prodDescription, prodURL, amount
            FROM Products;
            `
            db.query(strQry, (err, results) => {
                if(err) throw new Error('Unable to fetch Products...')
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

    fetchProduct(req, res) {
        try{
            const strQry = `
            SELECT productID, prodName, category, prodDescription, prodURL, amount
            FROM Products;
            `
            db.query(strQry, (err,results) => {
                if(err) throw new Error ('Unable to fetch a product...')
                    res.json({
                        status: res.statusCode,
                        resuts
                    })
            })
        } catch (e){
            res.json({
                status: res.statusCode,
                msg: e.message
            })
        }
    }
}