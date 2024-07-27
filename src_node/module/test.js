//
//
const CF = require('../conf/conf_app')
const { appCurrentDateTime } = require('../util/time_format')


let api = {
    "test": {
        "/api/test": {
            "method": "GET",
            "url": "{host}/api/test",
            "input": {},
            "desc": "test get check server health and API"
        }
    },
    "user": {

    },
    "project" : {

    },
    "WK": {

    },
    "KKKS" : {
        
    }
}


const test_get = async (req, res) => {
    try {
        const servDateTime = appCurrentDateTime()

        return res.json({
            isSuccess: true,
            payload: {
                appName: CF.app.name,
                port: CF.server.port,
                environment: CF.server.ENV,
                appVersion: CF.app.version,
                serverDate: servDateTime.strDate,
                serverTime: servDateTime.serverTime,
                random: Math.random()
            },
            api: api
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

// -----------------------------------------------------------------------------
module.exports = {
    test_get
}
