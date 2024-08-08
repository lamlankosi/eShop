function errorhandling(err, req, res, next) {
    if (err || res.statusCode >=400 ){
        res.json(
            {
                status: err.status || 
                res.statusCode || 500,
                err: ("An errror occurred. Please try again later")
            }
        )
    }
    next()
}

export {
    errorhandling
}