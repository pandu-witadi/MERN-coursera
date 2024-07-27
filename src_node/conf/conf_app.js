//
//
require('dotenv').config()

let CF = {
    app: {
        name: "MERN-coursera",
        version: "0.0.1"
    },
    server: {
        port: 5155,
        apiPath: '/api',
        ENV: 'development'
    },
    // mongodb setting
    mongoose: {
        options: {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        },
        url : 'mongodb://127.0.0.1:27017/MERN-coursera'
    },
    jwt: {
       saltLength: 10,
       accessToken: "edflvwgv684r04jmyg3s",
       accessTokenLife:  60 * 60 * 24 * 7,  // 60 minute * 24 *7

       refreshToken: "czxvlq511ugcwzw10jzk",
       refreshTokenLife:  60 * 60 * 24 * 14// 60 minute * 24 *7
    },
    frontEnd: {
        path: '/client_react/build'
    },
    model : {
        user: {
            register_state: true,
            automated_active: true
        }
    }
}

CF.server.ENV = process.env.ENV || CF.server.ENV
CF.server.PORT = process.env.PORT || CF.server.port

CF.jwt.saltLength =  process.env.saltLength || CF.jwt.saltLength

CF.jwt.accessToken =  process.env.ACCESS_TOKEN_SECRET || CF.jwt.accessToken
CF.jwt.refreshToken =  process.env.REFRESH_TOKEN_SECRET || CF.jwt.refreshToken

CF.jwt.accessTokenLife =  process.env.ACCESS_TOKEN_LIFE || CF.jwt.accessTokenLife
CF.jwt.refreshTokenLife =  process.env.REFRESH_TOKEN_LIFE || CF.jwt.refreshTokenLife


module.exports = CF
