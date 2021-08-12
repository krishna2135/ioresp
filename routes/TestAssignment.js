var express = require("express");

var router = express.Router();
var pool = require('../database/connection')

router.get("/questions", async (req, res) => {
    var type = req.query.type;


    try {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: error
                });
            }


            const queryStr = "SELECT id ,question,type,created_at,updated_at  FROM questions where type= '" + type + "'";
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
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
        console.log(err);
    }
});


router.post("/test", async (req, res) => {
    var type = req.query.type;


    try {
        const patient_id = req.body.patient_id;
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: error
                });
            }
            const queryStr = "SELECT assigned_test.id,assigned_test.repetitions,assigned_test.start_date,assigned_test.frequency,assigned_test.batch_number,assigned_test.type,assigned_test.doctor_id,assigned_test.patient_id,assigned_test.created_at,assigned_test.updated_at, assigned_test.test_status,frequencymaster.id as frequencyId,frequencymaster.Desc FROM assigned_test  INNER JOIN frequencymaster ON assigned_test.frequency=frequencymaster.id where patient_id=" + patient_id + " order by test_status asc";
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
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
        console.log(err);
    }
});

router.post("/test/submit", async (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: error
                });
            } // not connected!

            const assignedtestschedulemappingid = req.body.assignedtestschedulemappingid;
            const freqId = req.body.freqId;
            const assigned_test_id = req.body.assigned_test_id;
            const answers = req.body.answers;
            const user_id = req.body.user_id;
            const start_date = req.body.start_date;
            const repetitions = req.body.repetitions;
            const batch_number = "zJ2dErQCD";
            const uuid = "";

            answers.forEach(function (value) {

                let qry = "INSERT INTO answers (assigned_test_id,question_id,choice_id,user_id,batch_number,uuid,assignedtestschedulemappingid) VALUES ('" + assigned_test_id + "','" + value.question_id + "','" + value.choice_id + "','" + user_id + "','" + batch_number + "','" + uuid + "','" + assignedtestschedulemappingid + "')";

                connection.query(qry, function (error, results, fields) {
                    //  connection.release();
                    //  if (error) throw error;
                    if (error) {
                        res.status(400).send({
                            status: 0,
                            message: "something went wrong"
                        });
                    }

                });




            });




            //updating status


            var timestamp = Math.floor(new Date().getTime() / 1000.0)



            // var sql = "UPDATE AssignedTestScheduleMapping SET Status  = '1',TestTakenDate = '" + timestamp + "' WHERE id = '" + assignedtestschedulemappingid + "'";
            // connection.query(sql, function (err, result) {
            //     if (err) throw err;
            //     if (result) {
            //         console.log(result.affectedRows + " record(s) updated");
            //     }
            // });

            ///updating end


            // const queryStr = 'SELECT * FROM frequencymaster  where id=' + freqId;

            // connection.query(queryStr, function (error, frequencyRes, fields) {
            //     // connection.release();
            //     if (error) {
            //         res.send({
            //             status: 0,
            //             res: error
            //         });
            //     }
            //     if (frequencyRes) {
            //         let resObj = frequencyRes[0];

            //         // let insertId = results.insertId;

            //         var Value = resObj.Value;
            //         //  console.log(Value,"Value")
            //         var DayWeekMonthYearIndicator = resObj.DayWeekMonthYearIndicator;

            //         var testIntervalInDays = 1;

            //         if (DayWeekMonthYearIndicator == 'd') {
            //             testIntervalInDays = 1;
            //         } else if (DayWeekMonthYearIndicator == 'w') {
            //             testIntervalInDays = 7;
            //         } else if (DayWeekMonthYearIndicator == 'm') {
            //             testIntervalInDays = 30;
            //         } else if (DayWeekMonthYearIndicator == 'y') {
            //             testIntervalInDays = 365;
            //         }
            //         testIntervalInDays = testIntervalInDays * Value;

            //         var secondsInADay = 24 * 60 * 60;

            //         var finalIntervalInTimeStamp = (secondsInADay * testIntervalInDays);
            //         //  finalIntervalInTimeStamp=finalIntervalInTimeStamp-secondsInADay;// changed for tody starting date
            //         var firstDate = parseInt(start_date);
            //         const valueArr = [];
            //         const status = 0;
            //         let noOfTests = repetitions * Value;




            // for (let i = 0; i <= noOfTests; i++) {
            //     console.log(i, "noOfTests")
            //     if (i != 0) {
            //         firstDate = firstDate + (parseInt(finalIntervalInTimeStamp));

            //     }

            var qry = "UPDATE AssignedTestScheduleMapping SET Status  = '1',TestTakenDate = '" + timestamp + "' WHERE id = '" + assignedtestschedulemappingid + "'";
            connection.query(qry, function (err, result) {
                if (err) throw err;

            });

            console.log(qry);
            connection.query(qry, function (error, insertDate, fields) {
                //    console.log(insertDate)
                //    console.log(error)
                if (error) {
                    res.send({
                        status: 0,
                        res: error
                    });
                }

                // });
                //}
                var grtallteststatus = "SELECT COUNT(Status) as cnt FROM AssignedTestScheduleMapping where  status=0 and assignedtestid=" + assigned_test_id + "";
                connection.query(grtallteststatus, function (err, statusaresult) {
                    if (err) {
                        res.send({
                            status: 0,
                            res: err
                        });
                    }

                    if (statusaresult[0].cnt>0) {
                        console.log(statusaresult, "statusaresult")

                        var qryupdate = "UPDATE assigned_test SET test_status  = 1 WHERE id = " + assigned_test_id + "";
                        console.log(qryupdate, "qryupdate")
                        connection.query(qryupdate, function (err, result) {
                            if (error) {
                                res.send({
                                    status: 0,
                                    res: error
                                });
                            }

                            if (result) {
                                console.log("working")
                            }

                        })

                        
                        res.send({
                            status: 1
                        });
                    }
                    else {
                        var qryupdate = "UPDATE assigned_test SET test_status  = 2 WHERE id = " + assigned_test_id + "";
                        console.log(qryupdate, "qryupdate")
                        connection.query(qryupdate, function (err, result) {
                            if (error) {
                                res.send({
                                    status: 0,
                                    res: error
                                });
                            }

                            if (result) {
                                console.log("working")
                            }

                        })

                        connection.release();
                        res.send({
                            status: 1
                        });
                    }
                })
            })
            //}
            // });


            ///end forgot test logic
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});




module.exports = router
