var express = require("express");
var router = express.Router();
var md5 = require('md5');
var pool = require('../database/connection');
var nodemailer = require("nodemailer");
const fetch = require("node-fetch");



router.post("/getTitles", async (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query('SELECT * from users', function (error, results, fields) {
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

////Settings


router.get("/api/setting", async (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query('SELECT id,name,data from settings', function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {

                    const newResult = [];


                    results.forEach((element, index) => {
                        var dta = { "data": JSON.parse(element.data), "id": element.id, "name": element.name }
                        newResult.push(dta)
                        console.log(newResult)
                    });

                    res.send({
                        "status": 1,
                        newResult
                    }
                    );
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.get("/api/setting/:id", async (req, res) => {
    try {
        const id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query("SELECT * from settings where id=" + id + "", function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results) {
                    const newResult = [];


                    results.forEach((element, index) => {
                        var dta = { "data": JSON.parse(element.data), "id": element.id, "name": element.name }
                        newResult.push(dta)
                        console.log(newResult)
                    });

                    res.send({
                        "status": 1,
                        newResult
                    }
                    );
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});





////choice

router.get("/api/choice", async (req, res) => {
    try {
        var type = req.query.type;
        console.log(type, "type")
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query("SELECT * from choices where type='" + type + "' ", function (error, results, fields) {
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

router.get("/api/setting/:id", async (req, res) => {
    try {
        const id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query("SELECT * from settings where id=" + id + "", function (error, results, fields) {
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

///patient  link





router.post("/patient/link", async (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: error
                });
            }
            const patient_code = req.body.patient_code;
            const doctor_id = req.body.doctor_id;



            connection.query("SELECT user_id FROM patient_profiles WHERE patient_code= '" + patient_code + "'", function (error, results) {
                connection.release();
                if (error) {

                    res.send({
                        status: 0,
                        res: error
                    });
                }
                if (results) {

                    var user = results[0].user_id;

                    connection.query("SELECT COUNT(*) AS cnt FROM user_doctor WHERE doctor_id = '" + doctor_id + "' AND user_id='" + user + "'", function (err, data) {

                        if (err) {
                            res.status(400).send({
                                status: 0,
                                message: "something went wrong"
                            });
                        }
                        else {
                            if (data[0].cnt > 0) {
                                res.status(400).send({
                                    status: 0,
                                    message: "L' utente é già registrato"

                                });
                            } else {

                                let qry = "INSERT INTO user_doctor (doctor_id,user_id) VALUES ('" + doctor_id + "','" + user + "')";
                                console.log(qry)
                                connection.query(qry, function (error, results, fields) {
                                    //  connection.release();
                                    //  if (error) throw error;
                                    if (error) {
                                        res.status(400).send({
                                            status: 0,
                                            message: "something went wrong"
                                        });
                                    }
                                    if (results) {

                                        res.status(200).send({
                                            status: 1,
                                            message: "utente collegato con successo",

                                        });
                                    }
                                });


                            }
                        }
                    })

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

router.get("/questions", async (req, res) => {
    var type = req.query.type;
    console.log("ppppppppppp")

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
                    if (results) {

                        const newResult = []

                        if (type == "cat") {
                            console.log("rrrrrrrrrr")
                            results.forEach((element, index) => {
                                var dta = { "question": JSON.parse(element.question), "id": element.id, "type": element.type, "created_at": element.created_at, "updated_at": element.updated_at }
                                newResult.push(dta)
                                console.log(newResult)
                            });


                            res.send({
                                status: 1,
                                newResult
                            });

                        }
                        res.send({
                            status: 1,
                            results
                        });

                    }

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

router.post("/UserRegister", async (req, res) => {

    try {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const name = req.body.name;
            const email = req.body.email;
            const type = req.body.type;
            const password = req.body.password;
            const password_confirmation = req.body.password_confirmation;
            const patologie = req.body.patologie;
            const hashPassword = md5(password);
            var pin = Math.floor(1000 + Math.random() * 9000);
            let timeStamp = Math.floor(Date.now() / 1000);
            console.log(pin);


            connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email= '" + email + "'", function (err, data) {

                if (err) {
                    res.status(400).send({
                        status: 0,
                        message: "something went wrong"
                    });
                }
                else {
                    if (data[0].cnt > 0) {
                        res.status(400).send({
                            status: 0,
                            message: "Email già utilizzata"
                        });
                    } else {
                        if (password == password_confirmation) {
                            let qry = "INSERT INTO users (name,email, type, password) VALUES ('" + name + "', '" + email + "', '" + type + "','" + hashPassword + "')";
                            console.log(qry)
                            connection.query(qry, function (error, results, fields) {
                                connection.release();
                                if (error) throw error;
                                if (results) {

                                    let insertPIn = "INSERT INTO EmailAndPasswordVerification (email,pin,createdDate) VALUES ('" + email + "'," + pin + "," + timeStamp + ")"

                                    connection.query(insertPIn, function (error, pinresult, fields) {
                                        if (error) throw error;
                                        if (pinresult) {
                                            let transporter = nodemailer.createTransport({
                                                service: 'gmail',

                                                auth: {
                                                    user: 'krishna.singh@sanganan.in',
                                                    pass: '9936385877', // generated ethereal password
                                                },
                                            });



                                            let mailOptions = {
                                                from: 'IO-Resprio',
                                                to: email,
                                                subject: "Email Verifaction",
                                                text: "You are receiving this email because we received Register request for your account",
                                                html: `</br>You are receiving this email because we received a Register request for your account.</br>PIN:${pin}</b>`,
                                            };

                                            transporter.sendMail(mailOptions, function (error, info) {
                                                if (error) {
                                                    res.status(400).send({
                                                        status: 0,
                                                        message: error
                                                    });
                                                } else {
                                                    res.status(200).send({
                                                        status: 1,
                                                        message: "User Registerd Successfully and Email sent to your email please check your email"
                                                    });

                                                }
                                            });

                                        }

                                    })






                                }
                            });
                        }

                        else {
                            res.status(400).send({
                                status: 0,
                                message: "password doesnt match"
                            });
                        }
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


////sent mail


router.post("/sentmail", async (req, res) => {

    try {
        pool.getConnection(function (err, connection) {
            const email = req.body.email;
            const type = req.body.type;
            var pin = Math.floor(1000 + Math.random() * 9000);
            var timeStamp = Math.floor(Date.now() / 1000);
            console.log(pin);

            console.log("email:", email);
            if (type == "PATIENT") {
                connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email= '" + email + "' and type='" + type + "'", function (err, data) {

                    if (err) {
                        res.status(400).send({
                            status: 0,
                            message: "something went wrong"
                        });
                    }

                    else {
                        if (data[0].cnt > 0) {
                            let transporter = nodemailer.createTransport({
                                service: 'gmail',

                                auth: {
                                    user: 'krishna.singh@sanganan.in',
                                    pass: '9936385877', // generated ethereal password
                                },
                            });


                            let mailOptions = {
                                from: 'krishna.singh@sanganan.in',
                                to: email,
                                subject: "IO RESPRIO",
                                text: "You are receiving this email because we received a password reset request for your account.",
                                html: `</br>You are receiving this email because we received a password reset request for your account.</br>PIN:${pin}</b>`,
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    res.status(400).send({
                                        status: 0,
                                        message: error
                                    });
                                } else {
                                    let getAlreadyexistEmail = "SELECT COUNT(*) AS cnt FROM EmailAndPasswordVerification WHERE email= '" + email + "'";
                                    console.log(getAlreadyexistEmail,"getAlreadyexistEmail")
                                    connection.query(getAlreadyexistEmail, function (error, emailresult, fields) {
                                        if (error) throw error;
                                        if (emailresult[0].cnt>0) {
                                            console.log(emailresult[0].cnt)


                                            // let insertPIn = "INSERT INTO EmailAndPasswordVerification (email,pin,createdDate) VALUES ('" + email + "'," + pin + "," + timeStamp + ")"
                                            let updateQry = "UPDATE EmailAndPasswordVerification set pin=" + pin + " where email='" + email + "'"

                                            connection.query(updateQry, function (error, pinresult, fields) {
                                                if (error) throw error;
                                                if (pinresult) {
                                                    res.status(200).send({
                                                        status: 1,
                                                        message: "E-mail inviata alla tua e-mail, controlla la tua e-mail"
                                                    });
                                                }
                                            })
                                        }
                                        else  {
                                            let insertPIn = "INSERT INTO EmailAndPasswordVerification (email,pin,createdDate) VALUES ('" + email + "'," + pin + "," + timeStamp + ")"

                                            connection.query(insertPIn, function (error, pinresult, fields) {
                                                if (error) throw error;
                                                if (pinresult) {
                                                    res.status(200).send({
                                                        status: 1,
                                                        message: "E-mail inviata alla tua e-mail, controlla la tua e-mail"
                                                    });
                                                }
                                            })
                                        }
                                    });


                                }
                            });
                        }

                        else {
                            res.status(400).send({
                                status: 0,
                                message: "L’email inserita non esiste. Perfavore inserisca un’email valida."
                            });
                        }

                    }
                });
            }

            ///Doctor
            if (type == "DOCTOR") {
                connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email= '" + email + "' and type='" + type + "'", function (err, data) {

                    if (err) {
                        res.status(400).send({
                            status: 0,
                            message: "something went wrong"
                        });
                    }

                    else {
                        if (data[0].cnt > 0) {
                            let transporter = nodemailer.createTransport({
                                service: 'gmail',

                                auth: {
                                    user: 'krishna.singh@sanganan.in',
                                    pass: '9936385877', // generated ethereal password
                                },
                            });


                            let mailOptions = {
                                from: 'krishna.singh@sanganan.in',
                                to: email,
                                subject: "IO RESPRIO",
                                text: "You are receiving this email because we received a password reset request for your account.",
                                html: `</br>You are receiving this email because we received a password reset request for your account.</br>PIN:${pin}</b>`,
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    res.status(400).send({
                                        status: 0,
                                        message: error
                                    });
                                } else {

                                    let getAlreadyexistEmail = "SELECT COUNT(*) AS cnt FROM EmailAndPasswordVerification WHERE email= '" + email + "'";
                                    console.log(getAlreadyexistEmail,"getAlreadyexistEmail")
                                    connection.query(getAlreadyexistEmail, function (error, emailresult, fields) {
                                        if (error) throw error;
                                        if (emailresult[0].cnt>0) {
                                            console.log(emailresult[0].cnt)


                                            // let insertPIn = "INSERT INTO EmailAndPasswordVerification (email,pin,createdDate) VALUES ('" + email + "'," + pin + "," + timeStamp + ")"
                                            let updateQry = "UPDATE EmailAndPasswordVerification set pin=" + pin + " where email='" + email + "'"

                                            connection.query(updateQry, function (error, pinresult, fields) {
                                                if (error) throw error;
                                                if (pinresult) {
                                                    res.status(200).send({
                                                        status: 1,
                                                        message: "E-mail inviata alla tua e-mail, controlla la tua e-mail"
                                                    });
                                                }
                                            })
                                        }
                                        else  {
                                            let insertPIn = "INSERT INTO EmailAndPasswordVerification (email,pin,createdDate) VALUES ('" + email + "'," + pin + "," + timeStamp + ")"

                                            connection.query(insertPIn, function (error, pinresult, fields) {
                                                if (error) throw error;
                                                if (pinresult) {
                                                    res.status(200).send({
                                                        status: 1,
                                                        message: "E-mail inviata alla tua e-mail, controlla la tua e-mail"
                                                    });
                                                }
                                            })
                                        }
                                    });
                                    
                                    // let insertPIn = "INSERT INTO EmailAndPasswordVerification (email,pin,createdDate) VALUES ('" + email + "'," + pin + "," + timeStamp + ")"

                                    // connection.query(insertPIn, function (error, pinresult, fields) {
                                    //     if (error) throw error;
                                    //     if (pinresult) {
                                    //         res.status(200).send({
                                    //             status: 1,
                                    //             message: "E-mail inviata alla tua e-mail, controlla la tua e-mail"
                                    //         });
                                    //     }
                                    // })


                                }
                            });
                        }

                        else {
                            res.status(400).send({
                                status: 0,
                                message: "L’email inserita non esiste. Perfavore inserisca un’email valida."
                            });
                        }

                    }
                });
            }

        });

    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});


router.post("/forgot-password", async (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            const email = req.body.email;
            const password = req.body.password;
            const conform_password = req.body.conform_password;

            console.log("email:", email);
            connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email= '" + email + "'", function (err, data) {

                if (err) {
                    res.status(400).send({
                        status: 0,
                        message: "something went wrong"
                    });
                }

                else {
                    if (data[0].cnt > 0) {
                        if (password == conform_password) {
                            const hashPassword = md5(password);
                            var qry = "UPDATE users SET password  = '" + hashPassword + "' WHERE email = '" + email + "'";
                            console.log(qry)
                            connection.query(qry, function (err, result) {
                                if (err) {
                                    res.status(400).send({
                                        status: 0,
                                        message: "something went wrong"
                                    });
                                }
                                if (result) {
                                    res.status(200).send({
                                        status: 1,
                                        message: "password aggiornata con successo"
                                    });
                                }

                            });
                        }
                        else {
                            res.status(400).send({
                                status: 1,
                                message: "Password e password conformi non corrispondono"
                            });
                        }
                    }
                    else {
                        res.status(400).send({
                            status: 0,
                            message: "L’email inserita non esiste. Perfavore inserisca un’email valida"
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
router.post("/api/token/create", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const type =req.body.type;
        const hashPassword = md5(password);
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query("SELECT * from users where email='" + email + "' and type='" + type + "'", function (error, results, fields) {
                
                if (error) throw error;
                if (results.length > 0) {
                    let innerqry="SELECT * from users where email='" + email + "' and password='" + hashPassword + "'";
                    connection.query(innerqry, function (error, innerqryresults, fields) {
                        connection.release();
                        if(innerqryresults.length>0){
                    var userid = innerqryresults[0].id;
                    var usertype = innerqryresults[0].type;
                    if (innerqryresults[0].type == 'PATIENT') {
                        if (innerqryresults[0].email_verified_at > 0) {
                          


                            res.send({
                                "token": "1403|5DkvxYmKkCbP2QMSty5EIybo33Zzi8Knz7hmJNIa",
                                "status": "2",
                                "login_status": "1",
                                userid,
                                usertype,


                            })
                        }
                        else {
                            res.send({
                                status: 0,
                                message: "per favore verifica la tua email"
                            })
                        }
                    }
                    else if (innerqryresults[0].type == 'DOCTOR') {
                        if (innerqryresults[0].email_verified_at > 0 && results[0].admin_permissions == 1) {
                            res.send({
                                "token": "1403|5DkvxYmKkCbP2QMSty5EIybo33Zzi8Knz7hmJNIa",
                                "status": "2",
                                "login_status": "1",
                                userid,
                                usertype,


                            })

                        }
                        else {
                            res.send({
                                status: 1,
                                message: "Stiamo verificando il tuo account. Riprova più tardi"


                            })
                        }

                    }
                }
                else{
                    res.send({
                        "message": "Password non valida",
                        "status": "0",



                    })
                }
                });
                }
                else {
                    res.send({
                        "message": "L’email inserita non è associata a nessun account medico",
                        "status": "0",



                    })
                }
            });
        });
    } catch (err) {
        res.status(400).send({
            status: "Exception",
        });
    }
});

router.post("/api/patient", async (req, res) => {
    try {
        const doctorId = req.body.doctorId;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query(`SELECT user_doctor.id,user_doctor.doctor_id as doctorId,user_doctor.user_id as patientID,users.name,users.email,users.type FROM user_doctor  inner join users on user_id=users.id where doctor_id=${doctorId} `, function (error, results, fields) {
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



module.exports = router;