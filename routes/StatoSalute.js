var express = require("express");
var router = express.Router();
var pool = require('../database/connection')
const controller = require('../controllers/StatoSalute')
const constant = require('../utils/Constants')

router.get("/getStatoSaluteTestList", async (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query('SELECT id, name from StatoSaluteTestList where type =0', function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    res.send({
                        status: 1,
                        result: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/getPhysicalActivityParamsList", async (req, res) => {
    try {
        constant.printLog("getPhysicalActivityParamsList")
        constant.printLog(req.body)
        const osType = req.body.osType;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            const query = "SELECT id, name from StatoSaluteTestList where type = 0 and osType = 2 or osType= " + osType;
            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    res.send({
                        status: 1,
                        result: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/addHealthDetails", async (req, res) => {
    try {
        constant.printLog("addHealthDetails")
        constant.printLog(req.body)
        controller.addHealthDetails(req).then(activityDetails => {
            res.send(activityDetails)
        }).catch(error => {
            res.send(error)
        })
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/selfAssignedActivityByPatient", async (req, res) => {
    try {
        constant.printLog("selfAssignedActivityByPatient")
        constant.printLog(req.body)
        controller.selfAssignedActivity(req).then(activityDetails => {
            res.send(activityDetails)
        }).catch(error => {
            res.send(error)
        })
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/getHealthDetailsListPatient", async (req, res) => {
    try {
        constant.printLog("getHealthDetailsListPatient")
        constant.printLog(req.body)
        const patient_id = req.body.patient_id;
        if (patient_id == undefined || patient_id == '' || patient_id == 'undefined') {
            res.send({
                status: 0
            });
            return;
        }

        pool.getConnection(async function (err, connection) {
            if (err) throw err; // not connected!
            let query = "SELECT DoctorPatientStatoSaluteMapping.id as DoctorPatientStatoSaluteMappingId ,DoctorPatientStatoSaluteMapping.doctor_id,DoctorPatientStatoSaluteMapping.patient_id,DoctorPatientStatoSaluteMapping.testId,DoctorPatientStatoSaluteMapping.frequencyId,DoctorPatientStatoSaluteMapping.repeitationId,DoctorPatientStatoSaluteMapping.duration,DoctorPatientStatoSaluteMapping.createTime,users.name as userName,users.type,StatoSaluteTestList.id as StatoSaluteTestListId,StatoSaluteTestList.name as TestName,StatoSaluteTestList.image,StatoSaluteTestList.placeHolder,frequencymaster.id,frequencymaster.Desc,frequencymaster.value,frequencymaster.DayWeekMonthYearIndicator,frequencymaster.Remarks,frequencymaster.frequencymastercol,StatoSaluteSchedule.Status,StatoSaluteSchedule.RecordInsertedDate,StatoSaluteSchedule.Value,StatoSaluteSchedule.HeartRate,StatoSaluteSchedule.distance from DoctorPatientStatoSaluteMapping INNER JOIN users ON DoctorPatientStatoSaluteMapping.doctor_id = users.id INNER JOIN StatoSaluteTestList ON DoctorPatientStatoSaluteMapping.testId=StatoSaluteTestList.id INNER JOIN frequencymaster ON DoctorPatientStatoSaluteMapping.frequencyId=frequencymaster.id  inner join StatoSaluteSchedule on DoctorPatientStatoSaluteMapping.id= StatoSaluteSchedule.DoctorPatientStatoSaluteMapping where patientResponsel=1 and patient_id=" + patient_id + " order by DoctorPatientStatoSaluteMapping.id desc"
            connection.query(query, async function (error, results, fields) {
                if (error) throw error;
                if (results) {
                    // var arrayCopy=[]
                    // var mainArray=[]
                    // for(data in results){

                    // }
                    connection.release();
                    res.send({
                        status: "1",
                        results
                    });

                }

            })

        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});



router.post("/getHealthDetailsListDoctor", async (req, res) => {
    try {
        constant.printLog("getHealthDetailsListDoctor")
        constant.printLog(req.body)
        const doctor_id = req.body.doctor_id;
        if (doctor_id == undefined) {
            res.send({
                status: 0
            });
            return;
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "SELECT DoctorPatientStatoSaluteMapping.id, DoctorPatientStatoSaluteMapping.doctor_id,DoctorPatientStatoSaluteMapping.patient_id,DoctorPatientStatoSaluteMapping.testId,DoctorPatientStatoSaluteMapping.frequencyId,DoctorPatientStatoSaluteMapping.repeitationId,DoctorPatientStatoSaluteMapping.duration,DoctorPatientStatoSaluteMapping.createTime,users.name as userName,users.type,StatoSaluteTestList.id as StatoSaluteTestListId,StatoSaluteTestList.name as TestName,frequencymaster.id,frequencymaster.Desc,frequencymaster.value,frequencymaster.DayWeekMonthYearIndicator,frequencymaster.Remarks,frequencymaster.frequencymastercol from DoctorPatientStatoSaluteMapping INNER JOIN users ON DoctorPatientStatoSaluteMapping.patient_id = users.id INNER JOIN StatoSaluteTestList ON DoctorPatientStatoSaluteMapping.testId=StatoSaluteTestList.id INNER JOIN frequencymaster ON DoctorPatientStatoSaluteMapping.frequencyId=frequencymaster.id where doctor_id=" + doctor_id;

            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    res.send({
                        status: 1,
                        results
                    });
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});


router.post("/getActivityDetails", async (req, res) => {
    try {

        constant.printLog("getActivityDetails")
        constant.printLog(req.body)
        controller.getActivityDetails(req).then(activityDetails => {
            res.send(activityDetails)
        }).catch(error => {
            res.send(error)
        })
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.get("/getrefValue/:id", async (req, res) => {
    try {
        constant.printLog("getrefValue")
        constant.printLog(req.params)

        const Id = req.params.id;
        if (Id == undefined) {
            res.send({
                status: 0
            });
            return;
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query("SELECT * from StatoSaluteTestList where id= '" + Id + "'", function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    console.log(results);
                    res.send(results);
                }
            });
        });

    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/getTodaysActivity", async (req, res) => {
    try {
        constant.printLog("getTodaysActivity")
        constant.printLog(req.body)
        controller.getTodaysActivity(req).then(activityDetails => {
            res.send(activityDetails)
        }).catch(error => {
            res.send(error)
        })
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/insertDataManuallyForSelfAssign", async (req, res) => {
    try {
        constant.printLog("insertDataManuallyForSelfAssign")
        constant.printLog(req.body)
        const StatoSaluteMappingId = req.body.StatoSaluteMappingId;
        const value = req.body.value;

        var valInInt = value.Value;
        var distance = value.distance;
        var hertRate = value.heartRate;

        const timestamp = Math.floor(new Date().getTime() / 1000.0)

        if (StatoSaluteMappingId == undefined || valInInt == undefined || value == undefined) {
            res.send({
                status: 0,
                message: 'Enter correct request'
            });
            return;
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "insert into StatoSaluteSchedule (DoctorPatientStatoSaluteMapping, Status, createdDate, RecordInsertedDate, Value, HeartRate, distance  ) values(" + StatoSaluteMappingId + ",1, " + timestamp + " ," + timestamp + " ," + valInInt + " ," + distance + " ," + hertRate + ")";
            console.log(query)
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                if (results) {
                    if (results) {
                        res.send({
                            status: 1
                        });
                    }
                }
            });
        });
    } catch (err) {
        console.log(err)
        res.status(400).send({
            status: "Exception",
            err
        });
    }
});


router.post("/insertDataFromHealthKit", async (req, res) => {
    try {
        constant.printLog("insertDataFromHealthKit")
        constant.printLog(req.body)

        const healthKitData = req.body.healthKitData;
        const timestamp = Math.floor(new Date().getTime() / 1000.0)

        if (healthKitData == undefined) {
            res.send({
                status: 0
            });
            return;
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            for (let i = 0; i < healthKitData.length; i++) {
                const StatoSaluteMappingId = healthKitData[i].StatoSaluteMappingId;
                const value = healthKitData[i].value;
                var valInInt = value.Value;
                var distance = value.distance;
                var hertRate = value.heartRate;
                var RecordInsertedDate = value.RecordInsertedDate;

                if (valInInt == undefined || distance == undefined || hertRate == undefined) {
                    res.send({
                        status: 0,
                        message: 'Invalid request'
                    });
                    return;
                }
                console.log(value)
                let query = "insert into StatoSaluteSchedule (DoctorPatientStatoSaluteMapping, Status, createdDate, RecordInsertedDate, Value, HeartRate, distance   ) values(" + StatoSaluteMappingId + ",1, " + timestamp + " ," + RecordInsertedDate + " ," + valInInt + " ," + distance + " ," + hertRate + ")";
                connection.query(query, function (error, results, fields) {
                    if (error) {
                        res.send({
                            status: 0
                        });
                    }

                });
            }
            // connection.release();
            res.send({
                status: 1
            });
        });
    } catch (err) {
        console.log(err)
        res.status(400).send({
            status: "Exception",
            err
        });
    }
});
router.post("/insertDataManually", async (req, res) => {
    try {
        constant.printLog("insertDataManually")
        constant.printLog(req.body)

        const id = req.body.StatoSaluteScheduleId;
        const value = req.body.value;
        const timestamp = Math.floor(new Date().getTime() / 1000.0)

        if (id == undefined || value == undefined) {
            res.send({
                status: 0
            });
            return;
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "UPDATE StatoSaluteSchedule SET RecordInsertedDate = '" + timestamp + "',value='" + value + "' ,Status=1 WHERE id = '" + id + "'";
            console.log(query)
            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    res.send({
                        status: 1
                    });
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/setStatoSaluteSetting", async (req, res) => {
    try {

        constant.printLog("setStatoSaluteSetting")
        constant.printLog(req.body)

        controller.setUserSetting(req).then(responsefromServer => {
            res.send(responsefromServer)
        }).catch(error => {
            res.send(error)
        })
    } catch (err) {
        res.status(400).send({
            status: "0",
        });
    }
});

router.post("/getStatoSaluteSetting", async (req, res) => {
    try {

        constant.printLog("getStatoSaluteSetting")
        constant.printLog(req.body)

        controller.getUserSetting(req).then(responsefromServer => {
            res.send(responsefromServer)
        }).catch(error => {
            res.send(error)
        })
    } catch (err) {
        res.status(400).send({
            status: "0",
        });
    }
});

router.post("/getGraphData", async (req, res) => {
    try {
        constant.printLog("getGraphData")
        constant.printLog(req.body)

        const patient_id = req.body.patient_id;
        const testId = req.body.testId;
        const endDate = Math.floor(new Date().getTime() / 1000.0)
        const startDate = endDate - (14 * 24 * 60 * 60);

        console.log(startDate);

        if (patient_id == undefined || patient_id == '') {
            res.send({
                status: 0
            });
            return;
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "SELECT StatoSaluteSchedule.Status,StatoSaluteSchedule.RecordInsertedDate,StatoSaluteSchedule.Value,StatoSaluteSchedule.HeartRate,StatoSaluteSchedule.HeartRate,distance FROM StatoSaluteSchedule inner join DoctorPatientStatoSaluteMapping on StatoSaluteSchedule.DoctorPatientStatoSaluteMapping=DoctorPatientStatoSaluteMapping.id where RecordInsertedDate between " + startDate + " and " + endDate + " and DoctorPatientStatoSaluteMapping.patient_id=" + patient_id + " and DoctorPatientStatoSaluteMapping.testId=" + testId + "";
            console.log(query);
            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    res.send({
                        status: 1,
                        results,
                        "average": 30
                    });
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});


router.post("/getLastSyncDataTime", async (req, res) => {
    try {
        constant.printLog("getLastSyncDataTime")
        constant.printLog(req.body)

        const patient_id = req.body.patient_id;
        if (patient_id == undefined || patient_id == '') {
            res.send({
                status: 0
            });
            return;
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "SELECT StatoSaluteSchedule.RecordInsertedDate FROM StatoSaluteSchedule inner join DoctorPatientStatoSaluteMapping on StatoSaluteSchedule.DoctorPatientStatoSaluteMapping=DoctorPatientStatoSaluteMapping.id where DoctorPatientStatoSaluteMapping.patient_id=" + patient_id + "   order By createdDate desc limit 1";
            console.log(query);
            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    res.send({
                        status: 1,
                        results
                    });
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/changeParameterStatus", async (req, res) => {
    try {
        constant.printLog("changeParameterStatus")
        constant.printLog(req.body)

        const patient_id = req.body.patient_id;
        const status = req.body.status;


        if (patient_id == undefined || status == undefined) {
            res.send({
                status: 0,
                message: 'Invalid request'
            });
            return;
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.release()
            res.send({
                status: 1
            });

        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});



router.post("/getUserProfile", async (req, res) => {
    try {
        constant.printLog("getUserProfile")
        constant.printLog(req.body)

        const userId = req.body.userId;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "select id  from patient_profiles where user_id =" + userId;

            connection.query(query, function (error, results, fields) {

                if (error) throw error;
                if (results) {
                    if (results.length > 0) {
                        let queryInner = "select * from users inner join patient_profiles on users.id=patient_profiles.user_id where users.id=" + userId + "";
                        connection.query(queryInner, function (err, innerresults, fields) {
                            connection.release();
                            if (err) {
                                res.send({
                                    status: 0,
                                    message: "something went wrong"
                                });
                            }
                            if (innerresults) {
                                // var finalData = innerresults.replace(/\\/g, "");

                                res.send({
                                    status: 1,
                                    innerresults

                                });
                            }
                        });

                    }

                    else {
                        let queryInner = "select * from users where id=" + userId + "";
                        connection.query(queryInner, function (err, innerresults, fields) {
                            connection.release();
                            if (err) {
                                res.send({
                                    status: 0,
                                    message: "something went wrong"
                                });
                            }
                            if (innerresults) {
                                res.send({
                                    status: 1,
                                    innerresults

                                });
                            }
                        });
                    }


                    // }
                    // res.send({
                    //     status: 1,
                    //     results: results[0]
                    // });
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/getTerapia", async (req, res) => {
    try {
       const userId = req.body.userId;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "select * from threpiaCount where userId =" + userId;

            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    if (results.length > 0) {
                        res.send({
                            status: 1,
                            results: results[0]
                        });
                    } else {
                        res.send({
                            status: 1,
                            results: {}
                        });
                    }
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});





module.exports = router