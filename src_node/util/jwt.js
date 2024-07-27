//
//
//
const jwt = require('jsonwebtoken')
const CF = require('../conf/conf_app')



const createToken = (jwt_obj, secret_str, secret_life) => {
    return jwt.sign(
        jwt_obj,
        secret_str,
        { expiresIn: secret_life }
    )
}

const decodeToken = (accessToken, secret_str) => {
    return jwt.verify(accessToken, secret_str)
}

module.exports = {
    createToken,
    decodeToken
}
