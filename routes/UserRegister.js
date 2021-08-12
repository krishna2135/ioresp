var express = require("express");
var router = express.Router();
var md5 = require('md5');
var pool = require('../database/connection')

// router.post("/UserRegister", async (req, res) => {
//     try {
//         pool.getConnection(function (err, connection) {
//             if (err) throw err;
//             const name = req.body.name;
//             const email = req.body.email;
//             const type = req.body.type;
//             const password = req.body.password;
//             const password_confirmation = req.body.password_confirmation;
//             const patologie = req.body.patologie;
//             const hashPassword = md5(password);
//             connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email= '" + email + "'", function (err, data) {
//                 if (err) {
//                     res.status(400).send({
//                         status: 0,
//                         message: "something went wrong"
//                     });
//                 } else {
//                     if (data[0].cnt > 0) {
//                         res.status(400).send({
//                             status: 0,
//                             message: "email already Registerd"
//                         });
//                     } else {
//                         if (password == password_confirmation) {
//                             let qry = "INSERT INTO users (name,email, type, password) VALUES ('" + name + "', '" + email + "', '" + type + "','" + hashPassword + "')";
//                             console.log(qry)
//                             connection.query(qry, function (error, results, fields) {
//                                 connection.release();
//                                 if (error) throw error;
//                                 if (results) {

//                                     let transporter = nodemailer.createTransport({
//                                         service: 'gmail',
            
//                                         auth: {
//                                             user: 'krishna.singh@sanganan.in',
//                                             pass: '9936385877', // generated ethereal password
//                                         },
//                                     });

//                                     let mailOptions = {
//                                         from: 'IOResprio',
//                                         to: email,
//                                         subject: "Email Verifaction",
//                                         text: "You are receiving this email because we received a register request for your account.",
//                                         html: "</br>You are receiving this email because we received a register request for your account request for your account.</br><button> PIN</button></b>",
//                                     };

//                                     transporter.sendMail(mailOptions, function (error, info) {
//                                         if (error) {
//                                             res.status(400).send({
//                                                 status: 0,
//                                                 message: error
//                                             });
//                                         } else {
//                                             res.status(200).send({
//                                                 status: 1,
//                                                 message: "Email sent to your email please check your email please and and verify"
//                                             });
            
//                                         }
//                                     });
//                                     // res.status(200).send({
//                                     //     status: 1,
//                                     //     message: "user successfully registerd"
//                                     // });
//                                 }
//                             });
//                         } else {
//                             res.status(400).send({
//                                 status: 0,
//                                 message: "password doesnt match"
//                             });
//                         }
//                     }
//                 }
//             })
//         });
//     } catch (err) {
//         res.status(400).send({
//             status: "Exception",
//         });
//     }
// });

router.post("/user/update-profile", async (req, res) => {
    try {
        const userId = req.body.userId;
        const name = req.body.name;
        const email = req.body.email;
        const patologie = req.body.patologie;
        const date_of_birth = req.body.date_of_birth;
        const sex = req.body.sex;
        const isTerapia = req.body.isTerapia;
        const patologie_respiratorie = req.body.patologie_respiratorie;
        const altre_respiratorie = req.body.altre_respiratorie;
        // const altre3=JSON.parse(altre_respiratorie)
        const altre = JSON.stringify(altre_respiratorie);
        const note = req.body.note;
        const patient_code = Math.random().toString(36).substring(2, 7);

        if (userId == undefined) {
            res.send({
                "status": 0
            })
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            let query = "select COUNT(user_id) AS counts from patient_profiles where user_id=" + userId;

            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                if (results[0].counts > 0) {
                    let updatequery = "UPDATE patient_profiles SET patologie_respiratorie = '" + patologie_respiratorie + "',Dob= " + date_of_birth + ",altre_respiratorie= '" + altre + "',sex='" + sex + "',patologie='" + patologie + "',note='" + note + "' WHERE user_id=" + userId;
                    console.log(updatequery)

                    connection.query(updatequery, function (error, resultsUpdate, fields) {
                        if (error) throw error;
                        if (resultsUpdate) {
                            let updatenameAndEmail = "UPDATE users SET name = '" + name + "',isTerapia='" + isTerapia + "' WHERE id=" + userId;
                            console.log(updatenameAndEmail);

                            connection.query(updatenameAndEmail, function (error, resultsUpdateName, fields) {
                                if (error) throw error;
                                if (resultsUpdateName) {

                                    let getData = "select * from patient_profiles inner join users on users.id= patient_profiles.user_id WHERE user_id=" + userId;
                                    console.log(updatenameAndEmail);

                                    connection.query(getData, function (error, resultsgetData, fields) {
                                        if(resultsgetData){
                                           res.send({
                                            status: 1,
                                            resultsgetData

                                        }); 
                                        }
                                        else{
                                            res.send({
                                                status: 1,
                                                resultsgetData
    
                                            }); 
                                        }
                                        // res.send({
                                        //     status: 1,
                                        //     message: "updated Successfully"

                                        // });
                                    });
                                } else {
                                    res.send({
                                        status: 0,
                                        message: "email already taken"

                                    });
                                }
                            });
                        }
                    })
                } else {
                    const insertQuery = "insert into patient_profiles (sex,patient_code,patologie,altre_respiratorie,patologie_respiratorie,note,user_id,Dob) values('" + sex + "', '" + patient_code + "','" + patologie + "','" + altre + "','" + patologie_respiratorie + "','" + note + "','" + userId + "','" + date_of_birth + "')";
                    console.log(insertQuery)
                    connection.query(insertQuery, function (error, insertResult, fields) {
                        if (error) throw error;
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
        res.status(400).send({
            status: "Exception",
        });
    }
});





module.exports = router;
