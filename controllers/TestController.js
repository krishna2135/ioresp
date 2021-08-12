var pool = require('../database/connection');
const notificationController = require('../controllers/NotificationController')
const constant = require('../utils/Constants');



module.exports = {
    notificationPrememoria
}

function notificationPrememoria(req) {
    return new Promise((resolve, reject) => {
        let timeStamp = Math.floor(Date.now() / 1000);
        let timeStamp24hlater = timeStamp + 86400;
        constant.printLog("its start working");
        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            let query = "SELECT * FROM  assigned_test inner join AssignedTestScheduleMapping on assigned_test.id=AssignedTestScheduleMapping.assignedtestid where   AssignedTestScheduleMapping.Status=0  and AssignedTestScheduleMapping.ScheduleDt  between " + timeStamp + " and " + timeStamp24hlater + " and isAccepted=1 and prememoriaToggle=1";
            console.log(query)
            connection.query(query, function (error, results, fields) {
                if (error) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results) {

                    var userIDs = []
                    for (data in results) {
                        userIDs.push(results[data].patient_id)
                    }

                }


                try {

                    notificationController.checkTokenPremoria(connection, userIDs, "IoRespiro", "Today some Test Assign to you please complete That", 1002).then(responsefromServer => {
                        console.log("Schedular")
                    }).catch(error => {
                        console.log(error)
                    })



                    // res.send({
                    //     status: 1
                    // });
                } catch (err) {
                    constant.printLog(err)
                    // res.status(400).send({
                    //     status: "Exception",err
                    // });
                }

            });
        })
    });
}