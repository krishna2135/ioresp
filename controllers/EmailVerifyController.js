var pool = require('../database/connection')
var constant = require('../utils/Constants')
const moment = require('moment');

module.exports = {
    verifyPin,
    verifyPinForforogtPass
}


function verifyPin(req) {
    return new Promise((resolve, reject) => {

        const email = req.body.email;
        const pin = req.body.pin;
        if (email == undefined) {
            reject({
                status: 0,
                message: "Invalid Request"
            });
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "SELECT COUNT(*) AS cnt from EmailAndPasswordVerification where email='" + email + "' and pin=" + pin + "";
            connection.query(query, function (err, results, fields) {

                connection.release();

                if (err) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results[0].cnt > 0) {
                    let currentmoment = moment();


                    let varifyUseremail = "UPDATE users set email_verified_at='2021-06-23T19:05:45+05:30' where email='" + email + "'";

                    connection.query(varifyUseremail, function (err, updateesults, fields) {
                        if (err) {
                            reject({
                                status: 0,
                                message: "Invalid Request"
                            });
                        }
                        if (updateesults) {

                            let findusersId = "SELECT * FROM users where email='" + email + "'";
                            connection.query(findusersId, function (err, idResult) {
                                if (err) {
                                    reject({
                                        status: 0,
                                        message: "Invalid Request"
                                    });
                                }
                                if (idResult) {
                                    const patient_code = Math.random().toString(36).substring(2, 7);
                                    var userID = idResult[0].id;
                                    let createPatientCode = "INSERT INTO patient_profiles (user_id,patient_code,patologie) VALUES (" + userID + ",'" + patient_code + "','ACO')"

                                    connection.query(createPatientCode, function (err, createuserIDREsult, fields) {
                                        if (err) {
                                            reject({
                                                status: 000,
                                                message: "Invalid Request"
                                            });
                                        }

                                        if (createuserIDREsult) {
                                            let deletePin = "delete from EmailAndPasswordVerification where email='" + email + "'"

                                            connection.query(deletePin, function (err, delresults, fields) {
                                                if (err) {
                                                    reject({
                                                        status: 0,
                                                        message: "Invalid Request"
                                                    });
                                                }
                                                if (delresults)
                                                    resolve({
                                                        status: 1,
                                                        message: "Email verifyed"

                                                    });
                                            });
                                            // resolve({
                                            //     status: 1,
                                            //     message: "Email verifyed"

                                            // });
                                        }
                                    })
                                }
                            })


                        }
                        else {
                            resolve({
                                status: 0,
                                message: "Something went wrong"

                            });
                        }

                    })
                } else {
                    resolve({
                        status: 0,
                        message: "PIN non valido"

                    });
                }
            });
        });
    })
}

function verifyPinForforogtPass(req) {
    return new Promise((resolve, reject) => {
        const email = req.body.email;
        const pin = req.body.pin;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "SELECT * FROM EmailAndPasswordVerification where email='" + email + "' and pin=" + pin + "";
            console.log(query);
            connection.query(query, function (err, results, fields) {
                if (err) {
                    reject({
                        status: 0,
                        message: "Invalid Request"
                    });
                }
                if (results) {
                    if (results.length > 0) {
                        var id = results[0].id;
                        let deletePIN = "delete from EmailAndPasswordVerification where id=" + id + "";
                        connection.query(deletePIN,function(err,resultDeletePIn,fields){
                            if(err){
                                rejecct({
                                    status:0,
                                    message:"something went wrong"
                                })
                            }
                            if(resultDeletePIn){
                                resolve({
                                    status: 1,
                                    message:"You pin verifyed now you can reset your password"
        
                                });

                            }
                        })
                        
                    }
                    else {
                        resolve({
                            status: 0,
                            "message": "You are using wrog email or pin"

                        });
                    }
                }

            })
        })


    });

}