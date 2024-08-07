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

export {
    createToken
}