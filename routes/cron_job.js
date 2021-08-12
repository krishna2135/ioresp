const cron = require("node-cron");
const SurveySentRecords = require("././models/SurveySentRecords");
const reminderRecords = require("././models/reminderRecords");
const partnerUser = require("../../models/partnerUser");
const partner = require("../../models/partner");
const Common = require("../../models/Common");
const ObjectID = require("mongoose").Types.ObjectId;

// Creating a cron job which runs on every 23 hours 59 minutes and 59 seconds 
cron.schedule("*/59 */59 */23 * * *", function () {
    sendAutomaticReminder()
});+

async function sendAutomaticReminder() {
    try {
       
        console.log("running a task every 23 hours 59 minutes and 59 seconds");
        const reminderRecordsData = await reminderRecords.find({ isReminderSet: true })
        if (!reminderRecordsData || reminderRecordsData.err) { }
        else if (reminderRecordsData.length > 0) {
            for (data of reminderRecordsData) { surveyIdArray.push(data.associatedPurchasedSurveyId) }
            if (surveyIdArray.length > 0) {
                const surveyContent = await SurveySentRecords.find({ '_id': { $in: surveyIdArray } })
                if (!surveyContent || surveyContent.err) { }
                else if (surveyContent.length > 0) { for (data of surveyContent) { surveyData.push(data) } }
            }
        }
        if (surveyData.length > 0) {
            for (data of surveyData) {
                if (data.reminderInterval && data.reminderInterval > 0) {
                    const interval = data.reminderInterval * 86400000
                    if (data.numberOfRemindersSent == 0 && !data.surveyResponded && data.surveyContent.questionCount > data.surveyContent.questionAnsweredCount) {
                        if ((interval + data.surveySentTime >= new Date().getTime())) {
                            sendReminder(data._id)
                        }
                    } else if (data.numberOfRemindersSent > 0 && data.numberOfReminders >= data.numberOfRemindersSent && !data.surveyResponded && data.surveyContent.questionCount > data.surveyContent.questionAnsweredCount) {
                        if ((interval + data.lastReminderSentTime >= new Date().getTime())) {
                            sendReminder(data._id)
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}

async function sendReminder(patientId, type, partnerId) {
    try {
        const surveySentRecordsDetails = await SurveySentRecords.findOne({ "_id": ObjectID(surveySentRecordsId) }).populate({
            path: 'associatedPurchasedScanId', model: 'purchasedScanDetail', populate: [{ path: 'associatedClientId', model: 'client' }]
        })
        const userDetails = await partnerUser.findOne({ "_id": userId }).select('firstName lastName emailId -_id')
        const companyDetails = await partner.findOne({ "_id": partnerId }).select('partnerName')
        if (!surveySentRecordsDetails || !userDetails || !companyDetails || surveySentRecordsDetails.err || userDetails.err || companyDetails.err) {
            res.send(responseObj.response(Constants.RESPONSE_STATUS_TYPE.FAILED, Constants.STRING.SOME_ERROR_OCCURED, Constants.STRING.BLANK_OBJECT))
        } else {
            const url = Common.getSurveyUrl(surveySentRecordsDetails._id.toString())
            const salutationReplacedBody = surveySentRecordsDetails.templateText.replace(/(?<=)({salutation})(?=)/gm, surveySentRecordsDetails.salutation)
            const firstNameReplaceBody = salutationReplacedBody.replace(/(?<=)({firstName})(?=)/gm, surveySentRecordsDetails.firstName)
            const lastNameReplacedBody = firstNameReplaceBody.replace(/(?<=)({lastName})(?=)/gm, surveySentRecordsDetails.lastName)
            const senderNameReplacedBody = lastNameReplacedBody.replace(/(?<=)({senderName})(?=)/gm, `${userDetails.firstName} ${userDetails.lastName}`)
            const companyNameReplacedBody = senderNameReplacedBody.replace(/(?<=)({companyName})(?=)/gm, companyDetails.partnerName)
            //final body after replacing clientCompany tag
            const finalBody = companyNameReplacedBody.replace(/(?<=)({clientCompany})(?=)/gm, surveySentRecordsDetails.associatedPurchasedScanId.associatedClientId.clientName)
            const senderNameReplacedFooter = surveySentRecordsDetails.templateFooter.replace(/(?<=)({senderName})(?=)/gm, `${userDetails.firstName} ${userDetails.lastName}`)
            //final footer after replacing companyName tag
            const finalFooter = senderNameReplacedFooter.replace(/(?<=)({companyName})(?=)/gm, companyDetails.partnerName)
            const messageBody = Common.getHtmlEmailBody(finalBody, url, surveySentRecordsDetails.buttonText, finalFooter)
            const newSubject = surveySentRecordsDetails.templateSubject.replace(/(?<=)({clientCompany})(?=)/gm, surveySentRecordsDetails.associatedPurchasedScanId.associatedClientId.clientName)
            const messageSent = await Common.sendEmailToContact(`${userDetails.firstName} ${userDetails.lastName}`, surveySentRecordsDetails.emailId, messageBody, newSubject, userDetails.emailId, companyDetails.partnerName)
            if (messageSent == 'success') {
                res.send(responseObj.response(Constants.RESPONSE_STATUS_TYPE.SUCCESS, Constants.STRING.REMINDER_SENT_SUCESS_MESSAGE, {}))
            } else {
                res.send(responseObj.response(Constants.RESPONSE_STATUS_TYPE.FAILED, Constants.STRING.SOME_ERROR_OCCURED, Constants.STRING.BLANK_OBJECT))
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }

}

module.exports.cron_job = cron