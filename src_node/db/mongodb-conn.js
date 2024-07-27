//
//
const mongoose = require('mongoose')

const CF = require('../conf/conf_app')


const connectMongoDB = async () => {
    try {
        console.log(`| MongoDB URL  : ${CF.mongoose.url}`)
        const conn = await mongoose.connect(CF.mongoose.url,  CF.mongoose.options)
        console.log(`| MongoDB URL: ${CF.mongoose.url}`)
        console.log(`| MongoDB Connected: ${conn.connection.host}`)
        console.log('|--------------------------------------------')
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectMongoDB
