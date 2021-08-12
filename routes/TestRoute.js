const express = require("express");
const router = express.Router();
const pool = require('../database/connection')
var json_encode = require('json_encode');
const notificationController = require('../controllers/NotificationController')
var constant = require('../utils/Constants')


router.post("/getTestHistoryPerformedBypatient", function (req, res) {
    try {
        constant.printLog("getTestHistoryPerformedBypatient")
        constant.printLog(req.body)
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: error
                });
            } else if (connection != null) {
                const assignedTestId = req.body.assignedTestId;
                const patientId = req.body.patientId;
                const queryStr = 'select * from AssignedTestScheduleMapping where assignedtestid=' + assignedTestId;
                console.log(queryStr);
                connection.query(queryStr, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        res.send({
                            status: 0,
                            res: error
                        });
                    }
                    if (results) {
                        res.send({
                            status: 1,
                            results
                        });
                    }
                });
            } else {
                res.status(400).send({
                    status: 0,
                });
            }
        });
    } catch (err) {
        res.status(400).send({
            status: 0,
        });
    }
});
///old api logic
// router.post("/assignNewTest", function (req, res) {
//     try {
//         constant.printLog("assignNewTest")
//         constant.printLog(req.body)
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 res.send({
//                     status: 0,
//                     res: err
//                 });
//             } else if (connection != null) {
//                 const repetitions = req.body.repetitions;
//                 let start_date = req.body.start_date;
//                 const frequency = req.body.frequency;
//                 const batch_number = req.body.batch_number;
//                 const type = req.body.type;
//                 const doctor_id = req.body.doctor_id;
//                 const patient_id = req.body.patient_id;
//                 let date_ob = new Date();
//                 let date = ("0" + date_ob.getDate()).slice(-2);
//                 let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
//                 let year = date_ob.getFullYear();
//                 let finalDate = year + "-" + month + "-" + date;

//                 let queryInner = "insert into assigned_test (repetitions,start_date, frequency,batch_number,type,doctor_id,patient_id,created_at) values('" + repetitions + "','" + start_date + "'," + frequency + ",'" + batch_number + "','" + type + "'," + doctor_id + "," + patient_id + ",'" + finalDate + "') ";
//                 connection.query(queryInner, function (err, results, fields) {
//                     if (err) {
//                         res.send({
//                             status: 0,
//                             res: err
//                         });
//                     }
//                     if (results) {
//                         console.log(results, "results")
//                         // const queryStr = 'SELECT * FROM assigned_test INNER JOIN frequencymaster ON assigned_test.frequency = frequencymaster.id where assigned_test.id=' + testId;
//                         const queryStr = 'SELECT * FROM frequencymaster  where id=' + frequency;
//                         console.log(queryStr)
//                         connection.query(queryStr, function (error, frequencyRes, fields) {
//                             // connection.release();
//                             if (error) {
//                                 res.send({
//                                     status: 0,
//                                     res: error
//                                 });
//                             }
//                             if (frequencyRes) {
//                                 let resObj = frequencyRes[0];

//                                 let insertId = results.insertId;

//                                 const Value = resObj.Value;
//                                 const DayWeekMonthYearIndicator = resObj.DayWeekMonthYearIndicator;

//                                 let testIntervalInDays = 1;

//                                 if (DayWeekMonthYearIndicator == 'd') {
//                                     testIntervalInDays = 1;
//                                 } else if (DayWeekMonthYearIndicator == 'w') {
//                                     testIntervalInDays = 7;
//                                 } else if (DayWeekMonthYearIndicator == 'm') {
//                                     testIntervalInDays = 30;
//                                 } else if (DayWeekMonthYearIndicator == 'y') {
//                                     testIntervalInDays = 365;
//                                 }
//                                 testIntervalInDays = testIntervalInDays * Value;

//                                 const secondsInADay = 24 * 60 * 60;

//                                 let finalIntervalInTimeStamp = (secondsInADay * testIntervalInDays);
//                                 //  finalIntervalInTimeStamp=finalIntervalInTimeStamp-secondsInADay;// changed for tody starting date
//                                 var firstDate = parseInt(start_date);
//                                 const valueArr = [];
//                                 const status = 0;
//                                 let noOfTests = repetitions * Value;



//                                 for (let i = 0; i < noOfTests; i++) {

//                                     if (i != 0) {
//                                         firstDate = firstDate + (parseInt(finalIntervalInTimeStamp));

//                                     }
                                     
//                                     let qry = 'insert into AssignedTestScheduleMapping (assignedtestid, ScheduleDt, Status) values(' + insertId + ',' + firstDate + ',' + status + ')';
//                                     constant.printLog("testing33")
//                                     console.log(qry,"how many time");
//                                     connection.query(qry, function (error, insertDate, fields) {
//                                         //    console.log(insertDate)
//                                         //    console.log(error)
//                                         if (error) {
//                                             res.send({
//                                                 status: 0,
//                                                 res: error
//                                             });
//                                         }

//                                     });
//                                 }
//                                 //  connection.release();
//                                 try {
//                                     constant.printLog("testing")
//                                     if (type == 'CAT') {
//                                         notificationController.sendNotification(patient_id, "Nuovo Test da Dotto", "Clicca per aprira il Test", doctor_id, 1002, connection, insertId).then(notificatioResult => {

//                                         }).catch(error => {
//                                             res.send(error)
//                                         })
//                                         notificationController.checkToken(connection, patient_id, "Nuovo Test da Dotto", "Clicca per aprira il Test", 1002).then(notificatioResult => {

//                                         }).catch(error => {
//                                             res.send(error)
//                                         })

//                                     }
//                                     else {

//                                         notificationController.sendNotification(patient_id, "Nuovo Test da Dotto", "Clicca per aprira il Test", doctor_id, 1001, connection, insertId).then(notificatioResult => {

//                                         }).catch(error => {
//                                             res.send(error)
//                                         })
//                                         notificationController.checkToken(connection, patient_id, "Nuovo Test da Dotto", "Clicca per aprira il Test", 1002).then(notificatioResult => {

//                                         }).catch(error => {
//                                             res.send(error)
//                                         })
//                                     }


//                                     res.send({
//                                         status: 1
//                                     });
//                                 } catch (err) {
//                                     constant.printLog(err)
//                                     res.status(400).send({
//                                         status: "Exception", err
//                                     });
//                                 }

//                             }
//                         });
//                     } else {
//                         res.status(400).send({
//                             status: 0,
//                         });
//                     }
//                 });
//             }
//         });
//     } catch (err) {
//         res.status(400).send({
//             status: 0, err
//         });
//     }
// });






/////New Api logic




router.post("/assignNewTest", function (req, res) {
    try {
        constant.printLog("assignNewTest")
        constant.printLog(req.body)
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: err
                });
            } else if (connection != null) {
                const repetitions = req.body.repetitions;
                let start_date = req.body.start_date;
                const frequency = req.body.frequency;
                const batch_number = req.body.batch_number;
                const type = req.body.type;
                const doctor_id = req.body.doctor_id;
                const patient_id = req.body.patient_id;
                let date_ob = new Date();
                let date = ("0" + date_ob.getDate()).slice(-2);
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                let year = date_ob.getFullYear();
                let finalDate = year + "-" + month + "-" + date;
                
                let queryInner = "insert into assigned_test (repetitions,start_date, frequency,batch_number,type,doctor_id,patient_id,created_at) values('" + repetitions + "','" + start_date + "'," + frequency + ",'" + batch_number + "','" + type + "'," + doctor_id + "," + patient_id + ",'" + finalDate + "') ";
                connection.query(queryInner, function (err, results, fields) {
                    if (err) {
                        res.send({
                            status: 0,
                            res: err
                        });
                    }
                    if (results) {
                        console.log(results, "results")
                        
                        const queryStr = 'SELECT * FROM frequencymaster  where id=' + frequency;
                        console.log(queryStr)
                        connection.query(queryStr, function (error, frequencyRes, fields) {
                            // connection.release();
                            if (error) {
                                res.send({
                                    status: 0,
                                    res: error
                                });
                            }
                            if (frequencyRes) {
                                let resObj = frequencyRes[0];

                                let insertId = results.insertId;

                                const Value = resObj.Value;
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
                                testIntervalInDays = testIntervalInDays * Value;

                                const secondsInADay = 24 * 60 * 60;

                                let finalIntervalInTimeStamp = (secondsInADay * testIntervalInDays);
                                //  finalIntervalInTimeStamp=finalIntervalInTimeStamp-secondsInADay;// changed for tody starting date
                                var firstDate = parseInt(start_date);
                                const valueArr = [];
                                const status = 0;
                                let noOfTests = repetitions * Value;



                                for (let i = 0; i < repetitions; i++) {

                                    if (i != 0) {
                                        firstDate = firstDate + (parseInt(finalIntervalInTimeStamp));

                                    }
                                     
                                    let qry = 'insert into AssignedTestScheduleMapping (assignedtestid, ScheduleDt, Status) values(' + insertId + ',' + firstDate + ',' + status + ')';
                                    
                                    connection.query(qry, function (error, insertDate, fields) {
                                        //    console.log(insertDate)
                                        //    console.log(error)
                                        if (error) {
                                            res.send({
                                                status: 0,
                                                res: error
                                            });
                                        }
                                        

                                    });
                                }
                                //  connection.release();
                                try {
                                    
                                    let getUser = "select name from users where id="+doctor_id+"";
                                    
                                            connection.query(getUser, function (error, getUserResult, fields) { 
                                                if (error) {
                                                    res.send({
                                                        status: 0,
                                                        res: error
                                                    });
                                                }
                                                if(getUserResult)
                                                {
                                                    
                                                   var doctorName=getUserResult[0].name;
                                               
                                    if (type == 'CAT') {
                                        notificationController.sendNotification(patient_id, "Nuovo Test da Dottor", "Clicca per aprire il Test", doctor_id, 1002, connection, insertId).then(notificatioResult => {

                                        }).catch(error => {
                                            res.send(error)
                                        })
                                        notificationController.checkToken(connection, patient_id, `Nuovo Test da ${doctorName} Test ${type}`, "Clicca per aprire il Test", 1002).then(notificatioResult => {

                                        }).catch(error => {
                                            res.send(error)
                                        })

                                    }
                                    else {

                                        notificationController.sendNotification(patient_id, "Nuovo Test da Dottor", "Clicca per aprire il Test", doctor_id, 1001, connection, insertId).then(notificatioResult => {

                                        }).catch(error => {
                                            res.send(error)
                                        })
                                        notificationController.checkToken(connection, patient_id, `Nuovo Test da ${doctorName} Test ${type}`, "Clicca per aprire il Test", 1002).then(notificatioResult => {

                                        }).catch(error => {
                                            res.send(error)
                                        })
                                    }
                                }
                            })


                                    res.send({
                                        status: 1
                                    });
                                } catch (err) {
                                    constant.printLog(err)
                                    res.status(400).send({
                                        status: "Exception", err
                                    });
                                }

                            }
                        });
                    } else {
                        res.status(400).send({
                            status: 0,
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).send({
            status: 0, err
        });
    }
});


////end new api logic

router.post("/getAssignedTestList", async (req, res) => {
    try {
        constant.printLog("getAssignedTestList")
        constant.printLog(req.body)

        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: err
                });
            }
            const patientId = req.body.patientId;
            const doctorId = req.body.doctorId;
            var query = "";
            if (doctorId == null || doctorId == '') {
                query = "select assigned_test.id, assigned_test.repetitions, assigned_test.start_date, assigned_test.type, assigned_test.doctor_id, assigned_test.patient_id, assigned_test.test_status,CONVERT(UNIX_TIMESTAMP(assigned_test.created_at),CHAR) as created_at,  frequencymaster.Desc from assigned_test INNER JOIN frequencymaster on assigned_test.frequency = frequencymaster.id  where assigned_test.patient_id=" + patientId + " order by assigned_test.test_status desc";
            } else {
                query = "select assigned_test.id, assigned_test.repetitions, assigned_test.start_date, assigned_test.type, assigned_test.doctor_id, assigned_test.patient_id, assigned_test.test_status,CONVERT(UNIX_TIMESTAMP(assigned_test.created_at),CHAR) as created_at,  frequencymaster.Desc from assigned_test INNER JOIN frequencymaster on assigned_test.frequency = frequencymaster.id  where assigned_test.patient_id=" + patientId + " and doctor_id=" + doctorId + " order by assigned_test.test_status desc";
            }
            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) {
                    res.send({
                        status: 0,
                        res: error
                    });
                }
                if (results) {
                    res.send({
                        status: 1,
                        testList: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
        console.log(err);
    }
});

router.post("/testPerformedByPatientDetails", function (req, res) {
    try {

        constant.printLog("testPerformedByPatientDetails")
        constant.printLog(req.body)


        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: error
                });
            } else if (connection != null) {
                const assignedTestId = req.body.assignedTestId;
                const assignedtestschedulemappingid = req.body.assignedtestschedulemappingid;
                let finalScore = 0;
                const queryStr = "select * from answers inner join questions on questions.id=answers.question_id inner join choices on answers.choice_id = choices.id where answers.assigned_test_id=" + assignedTestId + " and answers.assignedtestschedulemappingid=" + assignedtestschedulemappingid;
                console.log(queryStr, "queryStr")
                connection.query(queryStr, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        res.send({
                            status: 0,
                            res: error
                        });
                    }
                    if (results) {

                        for (let i = 0; i < results.length; i++) {
                            finalScore = finalScore + results[i].score;
                        }


                        res.send({
                            status: 1,
                            finalScore: finalScore,
                            results
                        });
                    }
                });
            } else {
                res.status(400).send({
                    status: 0,
                });
            }
        });
    } catch (err) {
        res.status(400).send({
            status: 0,
        });
    }
});

router.post("/todaysTestList", async (req, res) => {
    try {
        constant.printLog("todaysTestList")
        constant.printLog(req.body)

        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: err
                });
            }
            const patientId = req.body.patientId;
            const startTime = req.body.startTime;
            const endTime = req.body.endTime;

            const query = "SELECT AssignedTestScheduleMapping.id as id,AssignedTestScheduleMapping.assignedtestid,ScheduleDt,AssignedTestScheduleMapping.Status,AssignedTestScheduleMapping.TestTakenDate,assigned_test.repetitions,assigned_test.start_date,assigned_test.repetitions,assigned_test.frequency,assigned_test.type,assigned_test.type,assigned_test.doctor_id,assigned_test.patient_id,assigned_test.created_at,assigned_test.created_at,assigned_test.test_status,assigned_test.isAccepted FROM AssignedTestScheduleMapping inner join assigned_test on assigned_test.id=AssignedTestScheduleMapping.assignedtestid where  AssignedTestScheduleMapping.Status =0 and assigned_test.isAccepted=1 and (assigned_test.test_status=0 OR assigned_test.test_status=1) and AssignedTestScheduleMapping.ScheduleDt< " + endTime + " and patient_id=" + patientId + " order by AssignedTestScheduleMapping.id desc";
            console.log(query, "taiTestList");
            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) {
                    res.send({
                        status: 0,
                        res: error
                    });
                }
                if (results) {
                    let catTestList = [];
                    let taiTestList = []
                    for (let i = 0; i < results.length; i++) {
                        let obj = results[i].type;
                        if (obj == 'CAT')
                            catTestList.push(results[i]);
                        else
                            taiTestList.push(results[i]);
                    }
                    let qry = "select assigned_test.id, assigned_test.repetitions, assigned_test.start_date, assigned_test.type, assigned_test.doctor_id, assigned_test.patient_id, assigned_test.test_status,assigned_test.created_at,  frequencymaster.Desc from assigned_test INNER JOIN frequencymaster on assigned_test.frequency = frequencymaster.id  where assigned_test.patient_id=" + patientId + "  and assigned_test.test_status=2";
                    console.log(qry);
                    connection.query(qry, function (error, completedTestList, fields) {

                        if (error) {
                            res.send({
                                status: 0,
                                res: error
                            });
                        }
                        let catCompletedTestList = [];
                        let taiCompletedTestList = []
                        for (let i = 0; i < completedTestList.length; i++) {
                            let obj = completedTestList[i].type;
                            if (obj == 'CAT')
                                catCompletedTestList.push(completedTestList[i]);
                            else
                                taiCompletedTestList.push(completedTestList[i]);
                        }

                        let qryForFutureTests = "select assigned_test.id, assigned_test.repetitions, assigned_test.start_date, assigned_test.type, assigned_test.doctor_id, assigned_test.patient_id, assigned_test.test_status,assigned_test.created_at,frequencymaster.Desc from assigned_test INNER JOIN frequencymaster on assigned_test.frequency = frequencymaster.id  where assigned_test.patient_id= " + patientId + " and isAccepted=1 and assigned_test.test_status=0 and start_date >" + endTime;
                        connection.query(qryForFutureTests, function (error, futureTests, fields) {

                            if (error) {
                                res.send({
                                    status: 0,
                                    res: error
                                });
                            }
                            var catFutureTest = 0;
                            var taiFutureTest = 0;
                            for (let i = 0; i < futureTests.length; i++) {
                                let obj = futureTests[i].type;
                                if (obj == 'CAT')
                                    catFutureTest = 1;
                                if ((obj == 'TAI'))
                                    taiFutureTest = 1;
                            }
                            res.send({
                                status: 1,
                                catTestList,
                                catCompletedTestList,
                                taiTestList,
                                taiCompletedTestList,
                                catFutureTest,
                                taiFutureTest
                            });
                        });

                    });
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
        console.log(err);
    }
});


module.exports = router