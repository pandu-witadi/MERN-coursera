//
//
const bcrypt = require('bcryptjs')

const CF = require('../conf/conf_app')


const passwordHash = async(rawPassword) => {
    let salt = await bcrypt.genSalt( CF.jwt.saltLength )
    return await bcrypt.hash(rawPassword, salt)
}

const comparePassword = async(password, hash) => {
    return await bcrypt.compare(password, hash)
}


module.exports = {
    passwordHash,
    comparePassword
}
