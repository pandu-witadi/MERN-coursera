//
//
const CF = require('../conf/conf_app')
const { appCurrentDateTime } = require('../util/time_format')


let api = {
    "test": {
        "/api/test": {
            "method": "GET",
            "url": "{host}/api/test",
            "desc": "test get check server health and API"
        }
    },
    "auth": {
        "/api/auth": {
            "method": "GET",
            "url": "{host}/api/auth/find-all",
            "desc": "find all user"
        }
    },
    "course" : {
        "/api/auth": {
            "method": "GET",
            "url": "{host}/api/course/find-all",
            "desc": "find all course"
        }
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
