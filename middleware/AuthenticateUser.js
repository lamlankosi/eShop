import 'doconfigtenv/config'
import jwt from 'jsonwebtoken'

const {sign, verify} = jwt

//creeate a token for a user to access the website for an 1h
function createToken(user) {
    return sign(
        {
            emailAdd: user.emailAdd,
            pwd: user.pwd
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )
}

//verify content
function verifyAToken(req, res, next){
    const token =req?.headers["authorization"]
    if(token) {
        if (verify(token, process.env.SECRET_KEY)){
            next()
        } else {
            res?.json({
                status: res.statusCode,
                msg: "Please provide correct credentials"
            })
        } 
    } else {
        res?.json({
            status: res.statusCode,
            msg: "Please Login"
        })
    }
}

export {
    createToken,
    verifyAToken
}