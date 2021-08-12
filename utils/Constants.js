module.exports.URL = Object.freeze({

    AIRQUALITY: 'https://api.waqi.info/feed/geo'
});

module.exports.NOTIFICATION_TYPE = Object.freeze({
    ASSIGNED_TEST: 1001,
    ASSIGNED_ACTIVITY: 1000,

});

module.exports.NOTIFICATION_BODY = Object.freeze({
    ASSIGNED_TEST: "A new test assigned.",
    ASSIGNED_TEST_TITLE: "IoRespiro",

});

module.exports = {
    printLog
}

function printLog(logData) {
    
    console.log(logData)
}
