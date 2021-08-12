const cron = require("node-cron");
const notificationController = require('../controllers/SchedularTerapia')
const preMeromeriaNotification =require('../controllers/TestController')


cron.schedule("*/1 * * * *", function () {
    notificationController.getTerapiaListForNotification().then(responsefromServer => {
        console.log("Schedular")
    }).catch(error => {
        console.log(error)
    })
});


cron.schedule('00 00 12 * * 0-6', () => {
    
    preMeromeriaNotification.notificationPrememoria().then(responsefromServer => {
        console.log("Schedular")
    }).catch(error => {
        console.log(error)
    })
    
  
  });


module.exports.cron_job = cron