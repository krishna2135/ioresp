var express = require("express");

var router = express.Router();
var pool = require('../database/connection')
var constant = require('../utils/Constants')
const controller = require('../controllers/EmailVerifyController')



router.post("/verifyPin", async (req, res) => {
    try {
        constant.printLog("verifyPin")
        // constant.printLog(req.body)

        controller.verifyPin(req).then(responsefromServer => {
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


router.post("/verifyPinForforogtPass", async (req, res) => {
    try {
        constant.printLog("verifyPinForforogtPass")
        // constant.printLog(req.body)

        controller.verifyPinForforogtPass(req).then(responsefromServer => {
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

module.exports = router;

