var express = require("express");
var router = express.Router();
var pool = require('../database/connection');
const { printLog } = require("../utils/Constants");
const constant = require('../utils/Constants')

router.post("/insertTythrepiaDetails", async (req, res) => {
    try {

        constant.printLog("insertTythrepiaDetails")
        constant.printLog(req.body)


        const userId = req.body.userId;
        const morningTime = req.body.morningTime;
        const morningCount = req.body.morningCount;
        const eveningTime = req.body.eveningTime;
        const eveningCount = req.body.eveningCount;
        var eveningSwitch = req.body.eveningSwitch;
        var morningSwitch = req.body.morningSwitch;

        if (eveningSwitch == undefined) {
            eveningSwitch = 0
        }
        if (morningSwitch == undefined) {
            morningSwitch = 0
        }

        if (morningTime == undefined) {
            morningTime = 0
        }
       
        if (morningCount == undefined) {
            morningCount = 0
        }
        if (eveningTime == undefined) {
            eveningTime = 0
        }
        if (eveningCount == undefined) {
            eveningCount = 0
        }


        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "select COUNT(userId) AS counts from threpiaCount where userId=" + userId;
            console.log(query);
            connection.query(query, function (error, results, fields) {

                if (error) throw error;
                if (results[0].counts > 0) {
                    let updatequery = "UPDATE threpiaCount SET morningTime = " + morningTime + ",morningCount= " + morningCount + ",eveningTime=" + eveningTime + ",eveningCount=" + eveningCount +",morningSwitch=" + morningSwitch +",eveningSwitch=" + eveningSwitch + " WHERE userId=" + userId;

                    connection.query(updatequery, function (error, resultsUpdate, fields) {
                        if (error) throw error;
                        connection.release();
                        if (resultsUpdate) {
                            res.send({
                                status: 1,

                            });
                        }
                    })
                } else {
                    const insertQuery = "insert into threpiaCount (userId,morningTime,morningCount,eveningTime,eveningCount,morningSwitch, eveningSwitch) values('" + userId + "', '" + morningTime + "','" + morningCount + "','" + eveningTime + "','" + eveningCount + "','" + morningSwitch + "','" + eveningSwitch + "')";

                    connection.query(insertQuery, function (error, insertResult, fields) {
                        if (error) throw error;
                        connection.release();

                        if (insertResult) {
                            res.send({
                                status: 1,

                            });
                        }
                    });
                }
            });
        });
    } catch (err) {
        printLog(err)
        res.status(400).send({
            status: "Exception",err
        });
    }
});

router.post("/getTerapia", async (req, res) => {
    try {

        constant.printLog("getTerapia")


        userId = req.body.userId;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "select * from threpiaCount where userId =" + userId;

            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    res.send({
                        status: 1,
                        results: results[0]
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


module.exports = router