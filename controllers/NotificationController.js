var pool = require('../database/connection')
const FirebaseAdmin = require('firebase-admin');
const FirebaseServiceAccount = require('../Resources/firebasefile.json')
const constant = require('../utils/Constants')

FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(FirebaseServiceAccount)
});

// decleard Methods

module.exports = {
    insertFireBase,
    deleteToken,
    sendNotification,
    getNotificationForPatient,
    getNotificationForDoctor,
    notificationAcceptRejectForPatient,
    prememoriaNotificationToggle,
    sendPushMsg,
    checkToken,
    checkTokenPremoria,
    prememoriaList,
    prememoriaTheripaToggle,
    saveNotification,
    notificationLastReadedAt
}

function sendPushMsg(regIDs, titlee, bodye, notificationType) {
    return new Promise((resolve, reject) => {

        let message = {
            notification: {
                title: titlee,
                body: bodye
            },

            data: {
                title: titlee,
                body: bodye
            }
        };

        constant.printLog(message)
        constant.printLog(regIDs[0])
        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };

        FirebaseAdmin.messaging().sendToDevice(regIDs, message, options)
            .then(function (response) {
                constant.printLog(response, "sending push Notification");
                // console.log("sending push Notification")
            })
            .catch(function (error) {
                constant.printLog(error);
            });
    })
}

function checkToken(connection, userId, title, body, notificationType) {

    return new Promise((resolve, reject) => {

        connection.query('SELECT tokenId FROM firebaseTokens where userId = ' + userId, function (error, results, fields) {
            connection.release();
            if (error) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            if (results) {
                var regIDs = []
                for (data in results) {
                    regIDs.push(results[data].tokenId)
                }
                if (regIDs.length > 0)
                    sendPushMsg(regIDs, title, body, notificationType)

            }
        });

    })
}

///checking Token for doctor
function checkTokenForDoctor(connection, userId, title, body, notificationType) {
console.log(title, body,"title")

    return new Promise((resolve, reject) => {

        connection.query('SELECT tokenId FROM firebaseTokens where userId = ' + userId, function (error, results, fields) {
            connection.release();
            if (error) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            if (results) {

                var regIDs = []
                for (data in results) {
                    regIDs.push(results[data].tokenId)
                }
                if (regIDs.length > 0) {
                    sendPushMsg(regIDs, title, body, notificationType)
                }
            }
        });

    })
}

////////end
////checking token premoria

function checkTokenPremoria(connection, userId, title, body, notificationType) {

    return new Promise((resolve, reject) => {



        for (i = 0; i < userId.length; i++) {


            let query = 'SELECT tokenId FROM firebaseTokens where userId=' + userId[i];

            connection.query(query, function (error, results, fields) {


                if (error) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results) {

                    var regIDs = []
                    for (data in results) {
                        regIDs.push(results[data].tokenId)
                    }

                    if (regIDs.length > 0)
                        sendPushMsg(regIDs, title, body, notificationType)
                }

            });
        }




    })
}

////end


function insertFireBase(req) {
    return new Promise((resolve, reject) => {
        const tokenId = req.body.tokenId;
        const deviceId = req.body.deviceId;
        const userId = req.body.userId;
        const OS = req.body.OS;

        if (tokenId == undefined || deviceId == undefined || userId == undefined || OS == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            let queryForAlreadyExistDevice = "select COUNT(id) AS counts from firebaseTokens where userId=" + userId + " and deviceId='" + deviceId + "'";

            connection.query(queryForAlreadyExistDevice, function (error, counts, fields) {
                if (error) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (counts) {
                    let data = counts[0].counts;
                    if (data > 0) {
                        let queryInner = "UPDATE firebaseTokens SET tokenId ='" + tokenId + "' where userId= '" + userId + "' and deviceId='" + deviceId + "'";
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
                                    message: "Token updated successfully",
                                    status: 1
                                });
                            }
                        });

                    } else {
                        let query = "insert into firebaseTokens (tokenId,deviceId, userId,timestamp,OS) values('" + tokenId + "','" + deviceId + "','" + userId + "','" + Math.floor(Date.now() / 1000) + "' ,'" + OS + "') ";

                        connection.query(query, function (error, results, fields) {
                            connection.release();
                            if (error) throw error;
                            if (results) {
                                resolve({
                                    message: "created successfully",
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

function getNotificationForPatient(req) {
    return new Promise((resolve, reject) => {
        const patientId = req.body.patientId;
        if (patientId == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "select NotificationList.id,NotificationList.patientId,NotificationList.doctorId,NotificationList.notificationType,NotificationList.readAt,NotificationList.createdAt,NotificationList.NotificationMessage,NotificationList.NotificationTitle,NotificationList.notificationStatus,users.name as doctorName,NotificationList.TestId from NotificationList inner join users on users.id=NotificationList.doctorId where patientId =" + patientId + " order by id desc"; connection.query(query, function (err, results, fields) {

                connection.release();

                if (err) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results) {
                    resolve({
                        status: 1,
                        results
                    });
                }
            });
        });
    })
}

function getNotificationForDoctor(req) {
    return new Promise((resolve, reject) => {
        const doctorId = req.body.doctorId;
        if (doctorId == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query("SELECT doctorNotificationList.id,doctorId,patientId,AcceptRejectStatus,createdTime,TestId,NotificationTitle,users.name,assigned_test.type FROM doctorNotificationList inner join users on users.id=patientId inner join assigned_test on assigned_test.id=doctorNotificationList.TestId where doctorId = " + doctorId + " order by doctorNotificationList.id desc", function (error, results, fields) {
                connection.release();

                if (err) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results) {
                    resolve({
                        status: 1,
                        results
                    });
                }
            });
        });
    })
}

function notificationAcceptRejectForPatient(req) {
    return new Promise((resolve, reject) => {
        const TestId = req.body.TestId;
        const doctorId = req.body.doctorId;
        const patientId = req.body.patientId;
        const acceptReject = req.body.acceptReject;

        if (TestId == undefined || doctorId == undefined || patientId == undefined || acceptReject == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            let query = "update NotificationList set notificationStatus=" + acceptReject + " where TestId=" + TestId + "";

            connection.query(query, function (error, results, fields) {
                if (error) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results) {

                    // resolve({


                    let innerquery = "update assigned_test set isAccepted=" + acceptReject + " where id=" + TestId + "";

                    connection.query(innerquery, function (error, results, fields) {
                        if (error) {
                            reject({
                                status: 0,
                                message: "Invalid Request"
                            });
                        }
                        
                    })
                    // });
                }
                try {
                    let getUser = "select name from users where id=" + patientId + "";

                    connection.query(getUser, function (error, getUserResult, fields) {
                        if (error) {
                            res.send({
                                status: 0,
                                res: error
                            });
                        }
                        if (getUserResult) {

                            var patientName = getUserResult[0].name;
                            if (acceptReject == 2) {

                                saveNotification(patientId, doctorId, acceptReject, TestId, "scaduto", connection).then(notificatioResult => {

                                }).catch(error => {
                                    res.send(error)
                                })
                                checkTokenForDoctor(connection, doctorId, "IoRespiro", `Il paziente ${patientName}ha rifiutato il Test`, 1002).then(notificatioResult => {

                                }).catch(error => {
                                    res.send(error)
                                })

                                // res.send({
                                //     status: 1
                                // });
                            }
                            else {

                                saveNotification(patientId, doctorId, acceptReject, TestId, "Ha eseguito", connection).then(notificatioResult => {

                                }).catch(error => {
                                    res.send(error)
                                })
                                checkTokenForDoctor(connection, doctorId, "IoRespiro", `Il paziente ${patientName} ha accettato il Test`, 1002).then(notificatioResult => {

                                }).catch(error => {
                                    res.send(error)
                                })

                                // res.send({
                                //     status: 1
                                // });
                            }
                            resolve({
                                status: 1,
                                message: "Request Updated"
                            })
                        }
                    })
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





////Notification last rededat
function notificationLastReadedAt(req) {
    return new Promise((resolve, reject) => {
        const userId = req.body.userId;
        const rededAt = req.body.rededAt;

        if (userId == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            let query = "SELECT COUNT(id) as cnt from notificationLastReadedAt where userId=" + userId + "";

            connection.query(query, function (error, results, fields) {
                if (error) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results[0].cnt > 0) {




                    let innerquery = "update notificationLastReadedAt set lastReadAT=" + rededAt + " where userId=" + userId + "";

                    connection.query(innerquery, function (error, results, fields) {
                        if (error) {
                            reject({
                                status: 0,
                                message: "Invalid Request"
                            });
                        }
                        if (results) {
                            resolve({
                                status: 1,

                            })
                        }
                    })

                }

                else {
                    let insertQry = "insert into notificationLastReadedAt (userId,lastReadAT) values(" + userId + "," + rededAt + ")";

                    connection.query(insertQry, function (error, results, fields) {
                        if (error) {
                            reject({
                                status: 0,
                                message: "Invalid Request"
                            });
                        }
                        if (results) {
                            resolve({
                                status: 1,

                            })
                        }
                    })
                }

            });
        })
    });
}

//////prememoria 
function prememoriaNotificationToggle(req) {
    return new Promise((resolve, reject) => {
        const TestId = req.body.TestId;
        const togglevalue = req.body.togglevalue;
        const type = req.body.type;
        const switches = req.body.switches;


        if (TestId == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            if (type == "Test") {
                let query = "update assigned_test set prememoriaToggle=" + togglevalue + " where id=" + TestId + "";

                connection.query(query, function (error, results, fields) {
                    if (error) {
                        reject({
                            status: 0,
                            message: "Invalid Request"
                        });
                    }
                    if (results) {
                        resolve({
                            status: 1,
                            message: "Test aggiornato"
                        })

                    }



                });
            }
            else if (type == "Therpie" && switches == "morning") {

                let query = "update threpiaCount set prememoriaToggle=" + togglevalue + " ,morningSwitch =" + togglevalue + " where id=" + TestId + "";


                connection.query(query, function (error, results, fields) {
                    if (error) {
                        reject({
                            status: 0,
                            message: "Invalid Request"
                        });
                    }
                    if (results) {
                        resolve({
                            status: 1,
                            message: "Theripa aggiornato"
                        })

                    }



                });
            }
            else if (type == "Therpie" && switches == "evening") {
                let query = "update threpiaCount set prememoriaToggle=" + togglevalue + " ,eveningSwitch =" + togglevalue + " where id=" + TestId + "";


                connection.query(query, function (error, results, fields) {
                    if (error) {
                        reject({
                            status: 0,
                            message: "Invalid Request"
                        });
                    }
                    if (results) {
                        resolve({
                            status: 1,
                            message: "Theripa aggiornato"
                        })

                    }



                });
            }
            else {
                resolve({
                    status: 1,
                    message: "per favore aggiungi il tipo di interruttori switches"
                })
            }
        })
    });
}


///////prememoria therepia
function prememoriaTheripaToggle(req) {
    return new Promise((resolve, reject) => {
        const therapiaId = req.body.TestId;
        const togglevalue = req.body.togglevalue;

        if (TestId == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            let query = "update threpiaCount set prememoriaToggle=" + togglevalue + " where id=" + therapiaId + "";

            connection.query(query, function (error, results, fields) {
                if (error) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results) {
                    resolve({
                        status: 1,
                        message: "Request Updated"
                    })

                }



            });
        })
    });
}




////end






////end


///prememoria list
function prememoriaList(req) {
    return new Promise((resolve, reject) => {
        const patientId = req.body.patientId;


        if (patientId == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 0,
                    message: "Invalid Request"
                });
            }
            let query = "SELECT * FROM assigned_test where isAccepted=1 and patient_id=" + patientId + " order by id desc;";

            connection.query(query, function (error, results, fields) {
                if (error) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results) {
                    var prememoTestList = results;
                    // resolve({
                    //     status: 1,
                    //     prememoTestList
                    // })

                    let innerquery = "SELECT * FROM threpiaCount where userId=" + patientId + " order by id desc"

                    connection.query(innerquery, function (error, prememoriaThpeieList, fields) {
                        if (error) {
                            reject({
                                status: 0,
                                message: "Invalid Request"
                            });
                        }
                        if (prememoriaThpeieList) {
                            var morningPremoria = []
                            var eveningPremoria = []
                            prememoriaThpeieList.forEach(function (element, index) {

                                var objmorning = { "id": element.id, "userId": element.userId, "morningCount": element.morningCount, "morningTime": element.morningTime, "morningSwitch": element.morningSwitch, "prememoriaToggle": element.prememoriaToggle }
                                morningPremoria.push(objmorning)

                                var objevening = { "id": element.id, "userId": element.userId, "eveningCount": element.eveningCount, "eveningTime": element.eveningTime, "eveningSwitch": element.eveningSwitch, "prememoriaToggle": element.prememoriaToggle }
                                eveningPremoria.push(objevening)

                            })
                            resolve({
                                status: 1,
                                prememoTestList,
                                morningPremoria,
                                eveningPremoria

                            })
                        }

                    })

                }



            });
        })
    });
}
////end

function deleteToken(req) {
    return new Promise((resolve, reject) => {
        const userId = req.body.userId;
        if (userId == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query('DELETE  from firebaseTokens where userId=' + userId, function (error, results, fields) {
                connection.release();
                if (err) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results) {
                    resolve({
                        message: "User logged out.",
                        status: 1
                    });
                }
            });
        });
    })
}

async function sendNotification(patientId, title, body, doctorId, notificationType, connection, insertId) {
    constant.printLog("c heckinff")
    let timeStamp = Math.floor(Date.now() / 1000);
    let queryForInsertNotofication = "insert into NotificationList (patientId,NotificationTitle,NotificationMessage,doctorId, notificationType,createdAt,TestId) values(" + patientId + ",'" + title + "','" + body + "'," + doctorId + "," + notificationType + "," + timeStamp + "," + insertId + ")";
    constant.printLog(queryForInsertNotofication)

    connection.query(queryForInsertNotofication, function (error, result, fields) {

        if (error) {

        }
        if (result) {

        }
    });


}



/////

async function saveNotification(patientId, doctorId, AcceptRejectStatus, TestId, NotificationTitle, connection) {
    constant.printLog("c heckinff")
    let timeStamp = Math.floor(Date.now() / 1000);
    let queryForInsertNotofication = "insert into doctorNotificationList (doctorId,patientId,AcceptRejectStatus,createdTime,TestId,NotificationTitle) values(" + doctorId + "," + patientId + "," + AcceptRejectStatus + "," + timeStamp + "," + TestId + ",'" + NotificationTitle + "')";
    constant.printLog(queryForInsertNotofication)

    connection.query(queryForInsertNotofication, function (error, result, fields) {

        if (error) {

        }
        if (result) {

        }
    });


}
