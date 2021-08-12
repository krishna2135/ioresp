var express = require("express");
var router = express.Router();
var pool =require('../database/connection')

router.get("/video", async (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: error
                });
            }
            connection.query('SELECT *  from videos', function (error, results, fields) {
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

module.exports = router