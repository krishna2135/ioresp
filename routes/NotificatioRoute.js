const express = require("express");
const router = express.Router();
const pool = require('../database/connection')
const controller = require('../controllers/NotificationController')
var constant = require('../utils/Constants')


router.post("/insertFirebaseToken", async (req, res) => {
    try {
        constant.printLog("insertFirebaseToken")
        constant.printLog(req.body)

        controller.insertFireBase(req).then(responsefromServer => {
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

router.post("/testNotification", async (req, res) => {
    try {
        constant.printLog("testNotification")
        constant.printLog(req.body)

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            controller.checkToken(connection, req.body.userId, "Therapy", "Perfavore prendi 2 puff alle 19:00", 1002).then(responsefromServer => {
                res.send(responsefromServer)
            }).catch(error => {
                res.send(error)
            })
        });
    } catch (err) {
        res.status(400).send({
            status: "0",
        });
    }
});


router.post("/deleteFirebaseToken", async (req, res) => {
    try {
        constant.printLog("deleteFirebaseToken")
        constant.printLog(req.body)
        controller.deleteToken(req).then(responsefromServer => {
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

router.post("/getNotificationListForPatient", async (req, res) => {
    try {
        constant.printLog("getNotificationListForPatient")
        constant.printLog(req.body)

        controller.getNotificationForPatient(req).then(responsefromServer => {
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
router.post("/getNotificationListForDoctor", async (req, res) => {
    try {
        constant.printLog("getNotificationListForDoctor")
        constant.printLog(req.body)

        controller.getNotificationForDoctor(req).then(responsefromServer => {
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

router.post("/setNotificationToggle", async (req, res) => {
    try {
        constant.printLog("notificationToggle")
        constant.printLog(req.body)

        const userId = req.body.userId;
        const notificationStatus = req.body.notificationStatus;
        if (userId == undefined || notificationStatus == undefined) {
            res.send({
                status: 0,
                message: 'Enter correct request'
            });
            return;
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0
                });
                return
            }

            let updatequery = "UPDATE users SET notificationSetting = " + notificationStatus + " WHERE id=" + userId;
            constant.printLog(updatequery)
            connection.query(updatequery, function (error, resultsUpdate, fields) {
                if (err) {
                    res.send({
                        status: 0
                    });
                    return
                }
                if (resultsUpdate) {
                    res.send({
                        status: 1,
                        message: "Setting updated."
                    });
                }

            });

        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
            err
        });
    }
});

router.post("/getNotificatioToggle", async (req, res) => {
    try {
        const userId = req.body.userId;
        if (userId == undefined) {
            res.send({
                status: 0,
                message: 'Enter correct request'
            });
            return;
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query("SELECT notificationSetting as notificationStatus FROM users where id= " + userId, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    res.send(results[0]);
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/notificationUpdate", async (req, res) => {
    try {


        const patientId = req.body.patientId;
        let currentTimeStamp = Math.floor(Date.now() / 1000);

        if (patientId == undefined) {
            res.send({
                status: 0,
                message: 'Enter correct request'
            });
            return;
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0
                });
                return
            }

            let updatequery = "UPDATE NotificationList SET readAt = " + currentTimeStamp + " WHERE patientId=" + patientId;
            constant.printLog(updatequery)
            connection.query(updatequery, function (error, resultsUpdate, fields) {
                if (err) {
                    res.send({
                        status: 0
                    });
                    return
                }
                if (resultsUpdate) {
                    res.send({
                        status: 1,
                        message: "Setting updated."
                    });
                }

            });

        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
            err
        });
    }
});

router.post("/getNotificationCount", async (req, res) => {
    try {
        const patientId = req.body.patientId;
        if (patientId == undefined) {
            res.send({
                status: 0,
                message: "invalid request"
            })
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            let qry = "select lastReadAT from notificationLastReadedAt where userId=" + patientId + "";
            connection.query(qry, function (err, lastReadATResult, fields) {
                if (err) throw error;
                if (lastReadATResult.length>0) {
                    const lastreadedAt = lastReadATResult[0].lastReadAT
                    connection.query("SELECT  count(id) as NotificationCount from NotificationList where  patientId=" + patientId + " and createdAt >" + lastreadedAt + "", function (error, results, fields) {
                        connection.release();
                        if (error) throw error;
                        if (results) {

                            res.send(results[0]);
                        }
                    });
                }
                else{
                    
                    connection.query("SELECT  count(id) as NotificationCount from NotificationList where  patientId=" + patientId + " ", function (error, results, fields) {
                        connection.release();
                        if (error) throw error;
                        if (results) {

                            res.send(results[0]);
                        }
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
///


router.post("/getNotificationCountforDoctor", async (req, res) => {

    try {
        const doctorId = req.body.doctorId;
        if (doctorId == undefined) {
            res.send({
                status: 0,
                message: "invalid request"
            })
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            let qry = "select lastReadAT from notificationLastReadedAt where userId=" + doctorId + "";
            connection.query(qry, function (err, lastReadATResult, fields) {
                if (err) throw error;
                if (lastReadATResult.length>0) {
                    const lastreadedAt = lastReadATResult[0].lastReadAT

                    connection.query("SELECT count(id) as NotificationCount from doctorNotificationList  where doctorId=" + doctorId + " and createdTime>" + lastreadedAt + "", function (error, results, fields) {
                        connection.release();
                        if (error) throw error;
                        if (results) {
                            
                            res.send(results[0]);
                        }
                    });
                }
                else{
                    connection.query("SELECT count(id) as NotificationCount from doctorNotificationList  where doctorId=" + doctorId + " ", function (error, results, fields) {
                        connection.release();
                        if (error) throw error;
                        if (results) {
                            
                            res.send(results[0]);
                        }
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

router.post("/notificationAcceptRejectForPatient", async (req, res) => {
    try {
        constant.printLog("notificationAcceptRejectForPatient")
        constant.printLog(req.body)

        controller.notificationAcceptRejectForPatient(req).then(responsefromServer => {
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

router.post("/notificationLastReadedAt", async (req, res) => {
    try {
        constant.printLog("notificationLastReadedAt")
        constant.printLog(req.body)

        controller.notificationLastReadedAt(req).then(responsefromServer => {
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

router.post("/prememoriaNotificationToggle", async (req, res) => {
    try {
        constant.printLog("prememoriaNotificationToggle")
        constant.printLog(req.body)

        controller.prememoriaNotificationToggle(req).then(responsefromServer => {
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


router.post("/prememoriaTheripaToggle", async (req, res) => {
    try {
        constant.printLog("prememoriaTheripaToggle")
        constant.printLog(req.body)

        controller.prememoriaTheripaToggle(req).then(responsefromServer => {
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

router.post("/prememoriaList", async (req, res) => {
    try {
        constant.printLog("prememoriaList")
        constant.printLog(req.body)

        controller.prememoriaList(req).then(responsefromServer => {
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


module.exports = router