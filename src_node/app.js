//
//
'use strict'
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
// const fileUpload = require('express-fileupload')

const http = require('http')
const socketio = require('socket.io')


const connectMongoDB = require('./db/mongodb-conn')
// const { notFound, errorHandler } = require('./middleware/error')
const CF = require('./conf/conf_app')


const app = express()
const server = http.createServer(app)

if ( CF.server.ENV !== 'production' ) {
    const morgan = require('morgan')
    app.use( morgan('dev') )
}


app.use( cors() )
app.use( express.json() )

console.log('__dirname ' + __dirname)

// app.use( express.static( path.join(__dirname, 'public') ) )
app.use( '/images', express.static( path.join(__dirname, '..','images') ) )
app.use( '/videos', express.static( path.join(__dirname, '..','videos') ) )
app.use( '/files', express.static( path.join(__dirname, '..', 'files') ) )



// Database Connection
mongoose.Promise = global.Promise
Promise.resolve(app)
    .then( connectMongoDB() )
    .catch(err => console.error.bind(console, `MongoDB connection error: ${JSON.stringify(err)}`))


// for uploading
// app.use('/upload', express.static( path.join(__dirname, 'upload') ) )

// use: route
app.use('/api/test', require('./api/test'))
app.use('/api/auth', require('./api/auth'))
app.use('/api/home',  require('./api/home'))
app.use('/api/creator', require('./api/creator'))
app.use('/api/course',  require('./api/course'))

// serve client
//these 3 lines make sure that Angular/VUe/React and express app are coming from the same server
// const frontEndPath = path.join(__dirname, '..', CF.frontEnd.path)
// console.log(frontEndPath)
// app.use( express.static(frontEndPath) )
// app.get( ['/*'], function(req, res) {
//         res.sendFile('index.html',  { root: frontEndPath } )
//     }
// )

// app.use(notFound)
// app.use(errorHandler)

const io = socketio(server)

io.on('connect', (socket) => {

    socket.on('join', ({ UserName, room, userId}, callback) => {
        console.log('...join ', UserName, room, userId)
        socket.join(room)

        io.to(room).emit('admin',{
            // users:users[0].names,
            users: [],
            UserName: 'admin',
            newUser: true,
            Message: `Welcome to the class ${UserName}!`
        })

        socket.broadcast.to(room).emit('admin', {
            // users: users,
            UserName: `${UserName}`,
            // users:users[0].names,
            // newUser:newUser,
            Message: `${UserName} has joined!`
        })

    })

    socket.on('sendMessage', ({ UserName, userId, room, message}, callback ) => {
        console.log('...send message ', UserName, room, userId, message)
        const user = {"UserName":UserName,"Message":message,"userId":userId}
        io.to(room).emit('Received_message', { UserName: UserName, Message: message });
        callback()
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})

module.exports = server
