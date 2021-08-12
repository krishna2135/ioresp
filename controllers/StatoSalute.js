var pool = require('../database/connection')
const notificationController = require('../controllers/NotificationController')
const constant = require('../utils/Constants')

module.exports = {
    getTodaysActivity,
    addHealthDetails,
    getHealthDetailsList,
    getActivityDetails,
    setUserSetting,
    getUserSetting,
    selfAssignedActivity,
    getGraphData
}


function getActivityDetails(req) {

    var todayDate = Math.floor(Date.now() / 1000);
    const doctorPatientStatoSaluteMappingId = req.body.doctorPatientStatoSaluteMappingId;
    if (doctorPatientStatoSaluteMappingId == undefined) {
        reject({
            status: 0
        });
    }

    return new Promise((resolve, reject) => {
        try {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject({
                        status: 0
                    });
                }

                let query = "select * from StatoSaluteSchedule where DoctorPatientStatoSaluteMapping=" + doctorPatientStatoSaluteMappingId + " and RecordInsertedDate >0 "
                connection.query(query, function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    if (results) {
                        var total = 0
                        var count = 0
                        for (data in results) {
                            total = parseInt(total) + parseInt(results[data].Value)
                            count = data
                        }
                        constant.printLog(total)
                        count = (parseInt(count) + 1)
                        constant.printLog(count)
                        var avg = total / (count)
                        try {
                            resolve({
                                status: 1,
                                results,
                                "avg": parseFloat(avg.toFixed(2))
                            });
                        } catch (err) {
                            reject({
                                status: "0",
                            });
                        }
                    }
                });
            });
        } catch (err) {
            reject({
                status: "0",
            });
        }
    })
}


function getTodaysActivity(req) {

    try {
        var todayDate = Math.floor(Date.now() / 1000);
        //   var beginDate = 10000;
        // todayDate = todayDate + (24 * 60 * 60 * 7)
        const healthListId = req.body.DoctorPatientStatoSaluteMappingId;
        if (healthListId == undefined) {
            reject({
                status: 0
            });
        }

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject({
                        status: 0
                    });
                }
                let query = "SELECT StatoSaluteSchedule.id,StatoSaluteSchedule.DoctorPatientStatoSaluteMapping,StatoSaluteSchedule.ScheduleStartDate,StatoSaluteSchedule.Status,StatoSaluteSchedule.RecordInsertedDate, StatoSaluteSchedule.Value,StatoSaluteSchedule.createdDate,StatoSaluteTestList.refValue as MinandMaxValue FROM StatoSaluteSchedule inner join DoctorPatientStatoSaluteMapping on StatoSaluteSchedule.DoctorPatientStatoSaluteMapping= DoctorPatientStatoSaluteMapping.id  inner join StatoSaluteTestList on DoctorPatientStatoSaluteMapping.testId=StatoSaluteTestList.id where ScheduleStartDate <=" + todayDate + " and ScheduleEndDate >=" + todayDate + " and DoctorPatientStatoSaluteMapping.id=" + healthListId
                console.log(query);
                connection.query(query, function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    if (results) {
                        resolve({
                            status: 1,
                            results
                        });
                    }
                });
            });
        })
    } catch (err) {
        reject({
            status: 0
        })
    }
}


function getHealthDetailsList(patient_id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "SELECT DoctorPatientStatoSaluteMapping.doctor_id,DoctorPatientStatoSaluteMapping.patient_id,DoctorPatientStatoSaluteMapping.testId,DoctorPatientStatoSaluteMapping.frequencyId,DoctorPatientStatoSaluteMapping.repeitationId,DoctorPatientStatoSaluteMapping.duration,DoctorPatientStatoSaluteMapping.createTime,u1.name AS doctor_name,u2.name AS patient_name,u1.type as doctor_type,u2.type as patient_type,StatoSaluteTestList.id AS StatoSaluteTestListId,StatoSaluteTestList.name AS TestName, StatoSaluteTestList.image AS Testimg,frequencymaster.id,frequencymaster.Desc,frequencymaster.value,frequencymaster.DayWeekMonthYearIndicator,   frequencymaster.Remarks,frequencymaster.frequencymastercol FROM DoctorPatientStatoSaluteMapping INNER JOIN users u1 ON DoctorPatientStatoSaluteMapping.doctor_id = u1.id INNER JOIN users u2 on DoctorPatientStatoSaluteMapping.patient_id = u2.id INNER JOIN StatoSaluteTestList ON DoctorPatientStatoSaluteMapping.testId = StatoSaluteTestList.id INNER JOIN frequencymaster ON DoctorPatientStatoSaluteMapping.frequencyId = frequencymaster.id WHERE patient_id =" + patient_id + " ORDER BY DoctorPatientStatoSaluteMapping.id DESC ;";
            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) {
                    reject({
                        status: 0
                    });
                } else {
                    resolve({
                        status: 1,
                        results
                    });
                }
            });
        });
    })
}

function addHealthDetails(req) {
    return new Promise((resolve, reject) => {
        const doctor_id = req.body.doctor_id;
        const patient_id = req.body.patient_id;
        const type = '1';
        const testName = req.body.testName;
        const thresholdValue = req.body.thresholdValue;
        const frequencyId = req.body.frequencyId;
        const repeitationID = parseInt(req.body.repeitationID);
        const duration = parseInt(req.body.duration);

        var minValue = req.body.min;
        var maxValue = req.body.max;
        var todayDate = Math.floor(Date.now() / 1000);

        if (doctor_id == undefined || patient_id == undefined || testName == undefined || frequencyId == undefined ||
            repeitationID == undefined || duration == undefined) {
            reject({
                status: 0
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: err
                });
            }
            const innerQuery = "insert into StatoSaluteTestList (name,type,refValue,min,max) values('" + testName + "', '" + type + "','" + thresholdValue + "'," + minValue + "," + maxValue + ")";
            constant.printLog(innerQuery)
            connection.query(innerQuery, function (error, innerResult, fields) {
                if (error) {
                    res.send({
                        status: 0,
                        res: error
                    });
                }
                var testId = parseInt(innerResult.insertId);
                let query = "insert into DoctorPatientStatoSaluteMapping (doctor_id,patient_id, testId,frequencyId,repeitationID,duration,createTime) values(" + doctor_id + "," + patient_id + "," + testId + "," + frequencyId + "," + repeitationID + "," + duration + ",'" + Math.floor(Date.now() / 1000) + "') ";
                connection.query(query, function (error, results, fields) {
                    if (error) throw error;

                    if (results) {
                        const queryStr = 'SELECT * FROM frequencymaster  where id=' + frequencyId;
                        constant.printLog(queryStr)
                        connection.query(queryStr, function (error, frequencyRes, fields) {
                            if (error) {
                                res.send({
                                    status: 0,
                                    res: error
                                });
                            }
                            try {
                                if (frequencyRes) {
                                    let resObj = frequencyRes[0];
                                    let insertId = results.insertId;
                                    const DayWeekMonthYearIndicator = resObj.DayWeekMonthYearIndicator;
                                    let testIntervalInDays = 1;

                                    if (DayWeekMonthYearIndicator == 'd') {
                                        testIntervalInDays = 1;
                                    } else if (DayWeekMonthYearIndicator == 'w') {
                                        testIntervalInDays = 7;
                                    } else if (DayWeekMonthYearIndicator == 'm') {
                                        testIntervalInDays = 30;
                                    } else if (DayWeekMonthYearIndicator == 'y') {
                                        testIntervalInDays = 365;
                                    }
                                    //  testIntervalInDays = testIntervalInDays * Value;
                                    const secondsInADay = 24 * 60 * 60;
                                    let start_date = Math.floor(new Date().getTime() / 1000);
                                    let finalIntervalInTimeStamp = (secondsInADay * testIntervalInDays);
                                    //  finalIntervalInTimeStamp=finalIntervalInTimeStamp-secondsInADay;// changed for tody starting date
                                    var firstDate = parseInt(start_date);
                                    const valueArr = [];
                                    const status = 0;
                                    //   let noOfTests = repetitions * Value;

                                    for (let i = 0; i < duration; i++) {

                                        if (i != 0) {
                                            firstDate = firstDate + (parseInt(finalIntervalInTimeStamp));

                                        }
                                        var endDate = firstDate + (parseInt(finalIntervalInTimeStamp));
                                        let qry = 'insert into StatoSaluteSchedule (DoctorPatientStatoSaluteMapping, ScheduleStartDate, ScheduleEndDate, Status, createdDate) values(' + insertId + ',' + firstDate + ',' + endDate + ',' + status + ',' + todayDate + ')';
                                        constant.printLog(qry)
                                        for (let j = 0; j < repeitationID; j++) {

                                            connection.query(qry, function (error, insertDate, fields) {
                                                //    console.log(insertDate)
                                                //    console.log(error)
                                                if (error) {
                                                    reject({
                                                        status: 0,
                                                        res: error
                                                    });
                                                }

                                            });
                                        }

                                    }
                                    //  connection.release();
                                    // 1001 Assign a health Param to Patient By Doctor.
                                    notificationController.sendNotification(patient_id, doctor_id, 1003, connection);

                                    notificationController.checkToken(connection, patient_id, "IoRespiro", "A new test has been assigned.", 1003).then(notificatioResult => {

                                    }).catch(error => {
                                        res.send(error)
                                    })

                                    resolve({
                                        status: 1
                                    });


                                }
                            } catch (err) {
                                reject({
                                    status: 0
                                });
                            }

                        });

                    }
                });
            });
        });
    })
}


function selfAssignedActivity(req) {
    return new Promise((resolve, reject) => {
        const doctor_id = req.body.doctor_id;
        const patient_id = req.body.patient_id;
        const testId = req.body.testId;
        const startDate = req.body.startDate;
        const frequencyId = 1
        const repeitationID = 1
        const duration = 1
        var todayDate = Math.floor(Date.now() / 1000);

        if (doctor_id == undefined || patient_id == undefined || testId == undefined || frequencyId == undefined ||
            repeitationID == undefined || duration == undefined || startDate == undefined) {
            reject({
                status: 0
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            let queryForCheckRepeatation = "select COUNT(id) AS counts from DoctorPatientStatoSaluteMapping where patient_id=" + patient_id + " and testId=" + testId;
            connection.query(queryForCheckRepeatation, function (error, counts, fields) {
                if (error) throw error;
                if (counts) {
                    let data = counts[0].counts;
                    if (data > 0) {
                        reject({
                            status: 0,
                            message: "This test is already assigned to the patient."
                        });
                    } else {
                        let query = "insert into DoctorPatientStatoSaluteMapping (doctor_id,patient_id, testId,frequencyId,repeitationID,duration,createTime) values(" + doctor_id + "," + patient_id + "," + testId + "," + frequencyId + "," + repeitationID + "," + duration + ",'" + Math.floor(Date.now() / 1000) + "') ";
                        console.log(query);
                        connection.query(query, function (error, results, fields) {
                            if (error) throw error;

                            if (results) {
                                const queryStr = 'SELECT * FROM frequencymaster  where id=' + frequencyId;
                                console.log(queryStr)
                                connection.query(queryStr, function (error, frequencyRes, fields) {
                                    if (error) {
                                        res.send({
                                            status: 0,
                                            res: error
                                        });
                                    }
                                    try {
                                        if (frequencyRes) {
                                            let resObj = frequencyRes[0];
                                            let insertId = results.insertId;
                                            const DayWeekMonthYearIndicator = resObj.DayWeekMonthYearIndicator;
                                            let testIntervalInDays = 1;

                                            if (DayWeekMonthYearIndicator == 'd') {
                                                testIntervalInDays = 1;
                                            } else if (DayWeekMonthYearIndicator == 'w') {
                                                testIntervalInDays = 7;
                                            } else if (DayWeekMonthYearIndicator == 'm') {
                                                testIntervalInDays = 30;
                                            } else if (DayWeekMonthYearIndicator == 'y') {
                                                testIntervalInDays = 365;
                                            }
                                            //  testIntervalInDays = testIntervalInDays * Value;
                                            const secondsInADay = 24 * 60 * 60;
                                            let start_date = Math.floor(new Date().getTime() / 1000);
                                            let finalIntervalInTimeStamp = (secondsInADay * testIntervalInDays);
                                            //  finalIntervalInTimeStamp=finalIntervalInTimeStamp-secondsInADay;// changed for tody starting date
                                            var firstDate = startDate;
                                            const valueArr = [];
                                            const status = 0;
                                            //   let noOfTests = repetitions * Value;

                                            for (let i = 0; i < duration; i++) {

                                                if (i != 0) {
                                                    firstDate = firstDate + (parseInt(finalIntervalInTimeStamp));

                                                }
                                                console.log(firstDate)

                                                var endDate = parseInt(firstDate) + (3600 * 24 * 7);
                                                console.log(endDate)

                                                let qry = 'insert into StatoSaluteSchedule (DoctorPatientStatoSaluteMapping, ScheduleStartDate, ScheduleEndDate, Status, createdDate) values(' + insertId + ',' + firstDate + ',' + endDate + ',' + status + ',' + todayDate + ')';

                                                console.log(qry);

                                                for (let j = 0; j < repeitationID; j++) {

                                                    connection.query(qry, function (error, insertDate, fields) {
                                                        //    console.log(insertDate)
                                                        //    console.log(error)
                                                        if (error) {
                                                            resolve({
                                                                status: 0,
                                                                res: error
                                                            });
                                                        }

                                                    });
                                                }

                                            }
                                            connection.release();
                                            resolve({
                                                status: 1
                                            });
                                        }
                                    } catch (err) {
                                        reject({
                                            status: 0
                                        });
                                    }

                                });

                            }
                        });
                    }

                }
            });
        });
    })
}



function setUserSetting(req) {
    return new Promise((resolve, reject) => {

        const isManualEntry = req.body.isManualEntry;
        const userId = req.body.userId;
        const timestamp = Math.floor(new Date().getTime() / 1000.0)

        if (isManualEntry == undefined || userId == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
            return;
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            let queryForAlreadysetUserSetting = "select COUNT(id) AS counts from StatoSaluteSetting where userId = " + userId + "";
            console.log(queryForAlreadysetUserSetting);
            connection.query(queryForAlreadysetUserSetting, function (error, counts, fields) {
                if (error) {
                    reject({
                        status: 0,
                        message: error
                    });
                }
                if (counts) {
                    let data = counts[0].counts;
                    if (data > 0) {
                        let queryInner = "UPDATE StatoSaluteSetting SET isManualEntry =" + isManualEntry + " where userId= " + userId + " ";
                        console.log(queryInner);
                        connection.query(queryInner, function (err, results, fields) {
                            connection.release();
                            if (err) {
                                reject({
                                    status: 0,
                                    res: error
                                });
                            }
                            if (results) {
                                resolve({
                                    message: "Setting updated successfully",
                                    status: 1
                                });
                            }
                        });

                    } else {
                        let query = "insert into StatoSaluteSetting (isManualEntry, userId,updatedAt) values(" + isManualEntry + "," + userId + "," + timestamp + ") ";
                        console.log(query);
                        connection.query(query, function (error, results, fields) {
                            connection.release();
                            if (error) throw error;
                            if (results) {
                                resolve({
                                    message: "Setting updated successfully",
                                    status: 1
                                });
                            }
                        });
                    }
                }
            });
        });
    })
}

function getUserSetting(req) {
    return new Promise((resolve, reject) => {

        const userId = req.body.userId;

        if (userId == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
            return;
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            let queryForAlreadysetUserSetting = "select isManualEntry from StatoSaluteSetting where userId = " + userId + "";
            console.log(queryForAlreadysetUserSetting);
            connection.query(queryForAlreadysetUserSetting, function (error, result, fields) {
                if (error) {
                    reject({
                        status: 0,
                        message: error
                    });
                } else {
                    if (result.length > 0) {
                        var data = result[0];
                        var isManualEntry = data.isManualEntry
                        resolve({
                            status: 1,
                            isManualEntry
                        })
                    } else {
                        resolve({
                            status: 0,
                            isManualEntry: 0
                        })
                    }

                }

            });
        });
    })
}

function getDataFromLoop(param, connection) {
    var finalResult = []

    return new Promise((resolve, reject) => {
        console.log(param)
        for (data of param) {
            const testId = data.testId;
            const patient_id = data.patient_id;
            const endDate = Math.floor(new Date().getTime() / 1000.0)
            const startDate = endDate - (14 * 24 * 60 * 60);
            let queryInner = "SELECT StatoSaluteSchedule.Status,StatoSaluteSchedule.RecordInsertedDate,StatoSaluteSchedule.Value,StatoSaluteSchedule.HeartRate,StatoSaluteSchedule.HeartRate,distance FROM StatoSaluteSchedule inner join DoctorPatientStatoSaluteMapping on StatoSaluteSchedule.DoctorPatientStatoSaluteMapping=DoctorPatientStatoSaluteMapping.id where RecordInsertedDate between " + startDate + " and " + endDate + " and DoctorPatientStatoSaluteMapping.patient_id=" + patient_id + " and DoctorPatientStatoSaluteMapping.testId=" + testId + "";
            let innerres = connection.query(queryInner)
            console.log(innerres)
            connection.query(queryInner, async function (error, response, fields) {
                if (response) {
                    data.graphData = response
                    finalResult.push(data)
                    //  console.log(data)
                }

            });
        }
        resolve({
            finalResult
        })
    })
}



async function getGraphData(results, connection) {

    var res = await getDataFromLoop(results, connection);
    //connection.release()
    console.log("After lopp")
    return res;

}