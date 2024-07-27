//
//

const appCurrentDateTime = () => {
    const curDateTime = new Date()
    let strDate =
            curDateTime.getFullYear() + "-" +
            ('0' + (curDateTime.getMonth() + 1)).slice(-2) + "-" +
            ('0' + curDateTime.getDate()).slice(-2)


    return {
        "strDate" : strDate,
        "serverTime": curDateTime.toLocaleTimeString()
    }
}

module.exports = {
    appCurrentDateTime
}
