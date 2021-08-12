const express = require("express");
const router = express.Router();
const pool = require('../database/connection')

router.post("/patientProfileDrSide", function (req, res) {
    try {
        const patientID= req.body.patientID;
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: 'Connection Error'
                });
            } else if (connection != null) {
                
                const queryStr = "SELECT * FROM patient_profiles INNER JOIN users ON patient_profiles.user_id = users.id where user_id= " + patientID + "";
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

router.post("/userProfileAsDr", function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: 'Connection Error'
                });
            } else if (connection != null) {
                const email = req.body.email;
                const drId = req.body.drId;

                const queryStr = "SELECT admin_permissions FROM users where email= '" + email + "'";
                connection.query(queryStr, function (error, results, fields) {
                    //   connection.release();
                    if (error) {
                        res.send({
                            status: 0,
                            res: error
                        });
                    }
                    if (results) {
                        console.log(results);
                        let queryInner = "SELECT COUNT(user_id) AS patientCount FROM user_doctor where doctor_id=" + drId;
                        connection.query(queryInner, function (err, patientCount, fields) {
                            connection.release();
                            if (err) {
                                res.send({
                                    status: 0,
                                    res: error
                                });
                            }
                            if (results) {
                                res.send({
                                    status: 1,
                                    results,
                                    patientCount
                                });
                            }
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


module.exports = router