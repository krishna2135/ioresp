var pool = require('../database/connection')
const notificationController = require('../controllers/NotificationController')
const constant = require('../utils/Constants')

module.exports = {
    getTerapiaListForNotification
}

function getTerapiaListForNotification(req) {
    return new Promise((resolve, reject) => {

        let notifcationDate = Math.floor(new Date().getTime() / 1000);
        let notifcationDate30Min = notifcationDate + (60 * 1);
        
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "select * from threpiaCount where prememoriaToggle=1 and morningTime between " + notifcationDate + " and " + notifcationDate30Min + "  OR eveningTime between " + notifcationDate + " and " + notifcationDate30Min + ""
            
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                constant.printLog(results)
                if (results) {
                    for (data in results) {
                        const singleUserDetails = results[data]
                        notificationController.checkToken(connection, singleUserDetails.userId, "Reminder", "Terapia Notification", 12).then(responsefromServer => {
                            res.send(responsefromServer)
                        }).catch(error => {
                            res.send(error)
                        })
                    }

                }
            });
        });
    })
}