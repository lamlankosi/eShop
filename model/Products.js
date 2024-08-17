import {connection as db } from '../config/index.js'

class Products {
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
    recentProducts(req,res){
        try{
            const strQry = `
            SELECT productID, prodName, category, prodDescription, prodURL, amount
            FROM Products
            ORDER BY productID DESC
            LIMIT 5;
            `
            db.query(strQry, (err, results) => {
                if (err) throw new Error ('Unable to retrieve recent products')
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
        try {
            const strQry = `
            SELECT productID, prodName, category, prodDescription, prodURL, amount
            FROM Products
            WHERE productID = ${req.params.id};
            `
            db.query(strQry, (err, result) => { 
                if (err) throw new Error(err)
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
    deleteProducts(req, res) {
        try{
            const strQry = `
            DELETE  
            FROM Products
            WHERE productID= ${req.params.id};
            `
            db.query(strQry, (err) => {
                if (err) throw new Error('Unable to delete  a product... please try again')
                res.json({
                    status: res.statusCode,
                    msg: 'Product has been deleted successfully'
                })
            })
        } catch (e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    addProduct(req, res) {
        try {
            let data = req.body
            let strQry = `
            INSERT INTO Products
            SET ?;
            `;
            db.query(strQry, [data], (err) => {
                if (err) {
                    res.json({
                        status: res.statusCode,
                        msg: 'Failed to add the product.'
                    });
                } else {
                    res.json({
                        msg: 'Product added successfully.'
                    });
                }
            });
        } catch (e) {
            res.json({
                status: 404,
                error: e.message
            });
        }
    }
    updateProduct(req, res) {
        try {
            let data = req.body;
            const strQry = `
            UPDATE Products
            SET ?
            WHERE productID = ${req.params.id};`
            db.query(strQry, [data], (err) => {
                if (err) throw new Error(err);
                res.json({
                    status: res.statusCode,
                    msg: 'The product record was updated'
                });
            });
        } catch (e) {
            res.json({
                status: 400,
                msg: e.message
            });
        }
    }  
}

export{ 
    Products
}