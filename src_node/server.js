//
//
'use strict'
const http = require('http')

const CF = require('./conf/conf_app')
const { appCurrentDateTime } = require('./util/time_format')
const server = require('./app')

// const server = http.createServer(app)


//  Start the app on the specific interface (and port).
server.listen(CF.server.PORT, () => {
    const servDateTime = appCurrentDateTime()

    console.log('|--------------------------------------------')
    console.log('| Server      : ' + CF.app.name)
    console.log('| Environment : ' + CF.server.ENV)
    console.log('| Port        : ' + CF.server.PORT)
    console.log('| Date        : ' + servDateTime.strDate )
    console.log('| Local Time  : ' + servDateTime.serverTime )
    console.log('|------------------servDateTime.strDate--------------------------')
    console.log('| Waiting For Database Connection ')
})

process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0)
    })
})

module.exports = server
