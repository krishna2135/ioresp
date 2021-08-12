var express = require("express");
var router = express.Router();
var pool = require('../database/connection')
var constant = require('../utils/Constants')
const fetch = require("node-fetch");




router.post("/addAirQualityDetails", async (req, res) => {
    try {
        constant.printLog("addAirQualityDetails")
        constant.printLog(req.body)

        pool.getConnection(async function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: error
                });
            }
            if (connection) {
                const userId = req.body.userId;

                const locations = req.body.locations;
                let lat = locations[0];
                let lon = locations[1];
                console.log(locations.length,"locations")
                if(locations.length==0 || userId ==undefined){
                    res.send({
                        status: 1 
                    });
                    return;
                }
                const queryUrl = "SELECT airquality_details.id,airquality_details.createdTime, ST_X(geoLocation) as lat, ST_Y(geoLocation) lon ,( 6371 * ACOS(COS(RADIANS('" + lat + "')) * COS(RADIANS(ST_X(geoLocation))) * COS(RADIANS(ST_Y(geoLocation)) - RADIANS('" + lon + "')) + SIN(RADIANS('" + lat + "'))* SIN(RADIANS(ST_X(geoLocation))))) AS distance FROM airquality_details inner join air_quality_user on airquality_details.id=air_quality_user.air_quality_detail_mapping where air_quality_user.user_id=" + userId + " HAVING distance < '50' order by airquality_details.createdTime desc limit 1";

                connection.query(queryUrl, async function (error, updatedTime, fields) {

                    if (error) {
                        res.send({
                            status: 0,
                            res: error
                        });
                    }
                    if (updatedTime.length > 0) {

                        var id = updatedTime[0].id;

                        var latUpdatedTime = parseInt(updatedTime[0].createdTime);
                        latUpdatedTime = latUpdatedTime + (3600 * 24)
                        var currentTime = Math.floor(new Date().getTime() / 1000);

                        // if ((latUpdatedTime + (24 * 3600)) > currentTime) {
                        //     const updatequery = "UPDATE airquality_details set aqi=" + aqi + ",geoLocation=" + locationPoint + ",co='" + co + "',dew='" + dew + "',h='" + h + "',no2='" + no2 + "',o3='" + o3 + "',p='" + pm10 + "',pm25='" + pm25 + "',t='" + t + "',w='" + w + "' where id=" + id + "";
                        //       connnection.query(updatequery,function(err,updayeResult,fields){
                        //         if (err) {
                        //             res.send({
                        //                 status: 0,
                        //                 message:"something went wrong"
                        //             });
                        //         }
                        //         if(updayeResult){
                        //             res.send({
                        //                 status: 1,
                        //                  message: "Curent Data Updated"
                        //             });

                        //         }
                        //       })


                        // }
                        // else {
                        console.log((latUpdatedTime + (24 * 3600)));

                        const url = "https://api.waqi.info/feed/geo:" + locations[0] + ";" + locations[1] + "/?token=42406102659063f92013cb26ea89377c375cb1ea"
                        const resData = await fetch(url);
                        const json = await resData.json();
                        const status = json.status;
                        if (status == 'nope') {
                            connection.release();
                            res.send({
                                status: 1,
                                message: "No data found for this Coordinates"
                            });
                        } else {
                            var pm10, pm25, o3, t, w, p, co, dew, h, no2;
                            const cityname = json.data.city.name;
                            const aqi = json.data.aqi;
                            const geo = json.data.city.geo;
                            const createdTime = Math.floor(Date.now() / 1000);
                            try {
                                o3 = json.data.iaqi.o3.v;
                            } catch (err) {
                                o3 = "0"
                            }

                            try {
                                co = json.data.iaqi.co.v;
                                dew = json.data.iaqi.dew.v;
                                h = json.data.iaqi.h.v;
                                no2 = json.data.iaqi.no2.v;
                                o3 = json.data.iaqi.o3.v;
                                t = json.data.iaqi.t.v;
                                p = json.data.iaqi.p.v;
                                w = json.data.iaqi.w.v;
                            } catch (err) {
                                co = 0
                                dew = 0
                                h = 0
                                no2 = 0
                            }
                            try {
                                pm10 = json.data.iaqi.pm10.v;
                            } catch (err) {
                                pm10 = 0;
                            }
                            try {
                                pm25 = json.data.iaqi.pm25.v;
                            } catch (err) {
                                pm25 = 0;
                            }

                            if ((latUpdatedTime + (24 * 3600)) > currentTime) {
                                const locationPoint = "POINT(" + geo[0] + "," + geo[1] + ")";
                                const updatequery = "UPDATE airquality_details set aqi=" + aqi + ",geoLocation=" + locationPoint + ",co='" + co + "',dew='" + dew + "',h='" + h + "',no2='" + no2 + "',o3='" + o3 + "',p='" + pm10 + "',pm25='" + pm25 + "',t='" + t + "',w='" + w + "' where id=" + id + "";

                                connection.query(updatequery, function (err, updatedeResult, fields) {
                                    if (err) {
                                        res.send({
                                            status: 0,
                                            message: "something went wrong"
                                        });
                                    }
                                    if (updatedeResult) {
                                        const updateAirQualityUser = "UPDATE air_quality_user set updated_at=" + currentTime + " where air_quality_detail_mapping=" + id + "";

                                        connection.query(updateAirQualityUser, function (err, updateAirQualityUserResult, fields) {
                                            if (err) {
                                                res.send({
                                                    status: 0,
                                                    message: "something went wrong"
                                                });
                                            }
                                            if (updateAirQualityUserResult) {
                                                res.send({
                                                    status: 1,
                                                    message: "Current Data Updated"
                                                });
                                            }
                                        })


                                    }
                                })


                            }
                            else {
                                const locationPoint = "POINT(" + geo[0] + "," + geo[1] + ")";
                                const query = "insert into airquality_details (aqi, geoLocation, co, dew,h, no2,o3,p,pm10,pm25, t,w,createdTime)  values(" + aqi + "," + locationPoint + ",'" + co + "','" + dew + "', '" + h + "', '" + no2 + "', '" + o3 + "', '" + p + "','" + pm10 + "', '" + pm25 + "','" + t + "', '" + w + "','" + createdTime + "')";
                                // const query = "UPDATE airquality_details set aqi=" + aqi + ",geoLocation=" + locationPoint + ",co='" + co + "',dew='" + dew + "',h='" + h + "',no2='" + no2 + "',o3='" + o3 + "',p='" + pm10 + "',pm25='" + pm25 + "',t='" + t + "',w='" + w + "',createdTime='" + createdTime + "' where id=" + id + "";

                                connection.query(query, function (error, results, fields) {
                                    if (error) {
                                        res.send({
                                            status: 0
                                        });
                                    }
                                    if (results) {
                                        res.send({
                                            status: 1,
                                            message: "Data Inserted"
                                        });
                                        const insertId = results.insertId;
                                        const innerQuery = "insert into air_quality_user (user_id, updated_at, air_quality_detail_mapping) values('" + userId + "', '" + Math.floor(Date.now() / 1000) + "'," + insertId + ")";
                                        connection.query(innerQuery, function (error, innerResult, fields) {
                                            connection.release();
                                            if (error) {
                                                res.send({
                                                    status: 0,
                                                    res: error
                                                });
                                            }
                                            if (innerResult) {
                                                res.send({
                                                    status: 1,
                                                    json
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }

                    } else {

                        const url = "https://api.waqi.info/feed/geo:" + locations[0] + ";" + locations[1] + "/?token=42406102659063f92013cb26ea89377c375cb1ea"
                        
                        const resData = await fetch(url);
                        const json = await resData.json();
                        const status = json.status;

                        if (status == 'nope') {
                            connection.release();
                            res.send({
                                status: 1,
                                message: "No data found for this Coordinates"

                            });
                        } else {
                            var pm10, pm25, o3, t, w, p, co, dew, h, no2;
                            const cityname = json.data.city.name;
                            const aqi = json.data.aqi;
                            const geo = json.data.city.geo;
                            const createdTime = Math.floor(Date.now() / 1000);
                            try {
                                o3 = json.data.iaqi.o3.v;
                            } catch (err) {
                                o3 = "0"
                            }

                            try {
                                co = json.data.iaqi.co.v;
                                dew = json.data.iaqi.dew.v;
                                h = json.data.iaqi.h.v;
                                no2 = json.data.iaqi.no2.v;
                                o3 = json.data.iaqi.o3.v;
                                t = json.data.iaqi.t.v;
                                p = json.data.iaqi.p.v;
                                w = json.data.iaqi.w.v;
                            } catch (err) {
                                co = 0
                                dew = 0
                                h = 0
                                no2 = 0
                            }
                            try {
                                pm10 = json.data.iaqi.pm10.v;
                            } catch (err) {
                                pm10 = 0;
                            }
                            try {
                                pm25 = json.data.iaqi.pm25.v;
                            } catch (err) {
                                pm25 = 0;
                            }
                            const locationPoint = "POINT(" + geo[0] + "," + geo[1] + ")";
                            const query = "insert into airquality_details (aqi, geoLocation, co, dew,h, no2,o3,p,pm10,pm25, t,w,createdTime)  values(" + aqi + "," + locationPoint + ",'" + co + "','" + dew + "', '" + h + "', '" + no2 + "', '" + o3 + "', '" + p + "','" + pm10 + "', '" + pm25 + "','" + t + "', '" + w + "','" + createdTime + "');";

                            connection.query(query, function (error, results, fields) {
                                if (error) {
                                    res.send({
                                        status: 0
                                    });
                                }
                                if (results) {
                                    const insertId = results.insertId;
                                    const innerQuery = "insert into air_quality_user (user_id, updated_at, air_quality_detail_mapping) values('" + userId + "', '" + Math.floor(Date.now() / 1000) + "'," + insertId + ")";
                                    connection.query(innerQuery, function (error, innerResult, fields) {
                                        connection.release();
                                        if (error) {
                                            res.send({
                                                status: 0,
                                                res: error
                                            });
                                        }
                                        if (innerResult) {
                                            res.send({
                                                status: 1,
                                                json
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });

    } catch (err) {
        res.status(400).send({
            status: 0,
        });
        console.log(err);
    }
});

router.post("/getAirQuality", async (req, res) => {
    try {
        constant.printLog("getAirQuality")
        constant.printLog(req.body)

        pool.getConnection(async function (err, connection) {
            if (err) {
                res.send({
                    status: 0,
                    res: error
                });
            }
            if (connection) {
                var userId = req.body.userId;
                const pageNo = req.body.pageNo;
                const pageSize = 7;
                const startLimit = (pageNo - 1) * pageSize;
                const currentDate = Math.floor(Date.now() / 1000);
                const lastSevenDays = currentDate - 604800;

                const queryUrl = "SELECT air_quality_user.user_id,airquality_details.id,airquality_details.aqi, airquality_details.geoLocation, airquality_details.co,airquality_details.dew, airquality_details.h, airquality_details.no2,airquality_details.o3,airquality_details.p,airquality_details.pm10,airquality_details.pm25,airquality_details.t,airquality_details.w,airquality_details.createdTime,air_quality_user.updated_at from airquality_details inner join  air_quality_user on airquality_details.id=air_quality_user.air_quality_detail_mapping where air_quality_user.user_id=" + userId + " and airquality_details.createdTime >" + lastSevenDays + " order by airquality_details.id desc limit " + startLimit + "," + pageSize;
                


                connection.query(queryUrl, async function (error, results, fields) {
                    //connection.release();
                    if (error) {
                        res.send({
                            status: 0,
                            res: error
                        });
                    }
                    if (results.length > 0) {
                        if (results.length > 1) {

                            var newResults = []
                           
                            for (let i = 0; i < results.length; i++) {
                                
                                if (i > 0 ) {
                                    var dateDiff = results[i - 1].createdTime - results[i].createdTime;
                                   
                                    let numbserOfdays = parseInt(dateDiff / 86400);
                                    numbserOfdays=numbserOfdays- 1;
                                    
                                    if (numbserOfdays > 0) {
                                        for (let j = 1; j <= numbserOfdays; j++) {

                                            var previousDate = (parseInt(results[i].createdTime) + (86400*j)).toString()
                                            var sampleData = {
                                                "user_id": req.body.userId,
                                                "id": 0,
                                                "aqi": 0,
                                                "geoLocation": {
                                                    "x": 0,
                                                    "y": 0
                                                },
                                                "co": "0",
                                                "dew": "0",
                                                "h": "0",
                                                "no2": "0",
                                                "o3": "0",
                                                "p": "0",
                                                "pm10": "0",
                                                "pm25": "0",
                                                "t": "0",
                                                "w": "0",
                                                "createdTime": previousDate

                                            }
                                            newResults.push(sampleData);



                                        }


                                    }

                                }
                            
                        }
                            newResults = newResults.concat(results);
                            
                            newResults.sort(function (a, b) {
                                return parseInt(a.createdTime) - parseInt(b.createdTime);
                            })
                            newResults = newResults.reverse()
                            
                        }
                        if (results.length == 1) {
                            var newResults = []
                            for (let j = 0; j < 7; j++) {


                                var previousDate = ''
                                if (j == 0) {
                                    previousDate = (parseInt(results[0].createdTime) - 86400).toString()
                                }
                                if (j > 0) {
                                   
                                    previousDate = (parseInt(results[0].createdTime) - (86400 * (j + 1))).toString()
                                }

                                var sampleData = {
                                    "user_id": req.body.userId,
                                    "id": 0,
                                    "aqi": 0,
                                    "geoLocation": {
                                        "x": 0,
                                        "y": 0
                                    },
                                    "co": "0",
                                    "dew": "0",
                                    "h": "0",
                                    "no2": "0",
                                    "o3": "0",
                                    "p": "0",
                                    "pm10": "0",
                                    "pm25": "0",
                                    "t": "0",
                                    "w": "0",
                                    "createdTime": previousDate

                                }
                                newResults.push(sampleData);
                            }
                            newResults = newResults.concat(results);
                            newResults.sort(function (a, b) {
                                return parseInt(a.createdTime) - parseInt(b.createdTime);
                            })
                            newResults = newResults.reverse()
                           
                        }
                        // var dataInsertedDates= results[--i].createdTime;
                        // var dateDiff=dataInsertedDates-results[i].createdTime;
                        //  console.log(testData)


                        let Pm10ForeCastArr = [];
                        let updatedAQIForeCastArr = [];
                        const userId = req.body.userId;
                        const locations = results[0].geoLocation;
                        let lat = locations.x;
                        let cityDetails;
                        let lon = locations.y;
                        const url = "https://api.waqi.info/feed/geo:" + lat + ";" + lon + "/?token=42406102659063f92013cb26ea89377c375cb1ea"
                        
                        const resData = await fetch(url);
                        const json = await resData.json();
                        const status = json.status;
                        if (status == 'nope') {
                            connection.release();
                            res.send({
                                status: 0
                            });
                        } else {
                            var pm10, pm25, o3, t, w, p, co, dew, h, no2;

                            const aqi = json.data.aqi;
                            const geo = json.data.city.geo;
                            cityDetails = json.data.city;
                            const createdTime = Math.floor(Date.now() / 1000);
                            try {
                                o3 = json.data.iaqi.o3.v;
                            } catch (err) {
                                o3 = "0"
                            }
                            try {
                                co = json.data.iaqi.co.v;
                                no2 = json.data.iaqi.no2.v;
                                o3 = json.data.iaqi.o3.v;
                            } catch (err) {
                                co = 0
                                o3 = 0;
                                no2 = 0
                            }
                            try {
                                dew = json.data.iaqi.dew.v;
                            } catch (err) {
                                dew = 0;
                            }
                            try {
                                h = json.data.iaqi.h.v;
                            } catch (err) {
                                h = 0;
                            }
                            try {
                                pm10 = json.data.iaqi.pm10.v;
                            } catch (err) {
                                pm10 = 0;
                            }
                            try {
                                pm25 = json.data.iaqi.pm25.v;
                            } catch (err) {
                                pm25 = 0;
                            }
                            try {

                                Pm10ForeCastArr = json.data.forecast.daily.pm25;



                            } catch (err) { }
                        }
                        const query = "SELECT * FROM AqimasterData";
                        connection.query(query, async function (error, resul, fields) {
                            connection.release();
                            if (error) {
                                res.send({
                                    status: 0,
                                    res: error
                                });
                            }

                            for (let i = 0; i < Pm10ForeCastArr.length; i++) {


                                var object = Pm10ForeCastArr[i];
                                console.log(object,"object")
                                let avg = object.avg;
                                for (let j = 0; j < resul.length; j++) {

                                    let min = parseInt(resul[j].AQILowPPM);

                                    let maxm = parseInt(resul[j].AQIHighPPM);

                                    if (avg > min && avg < maxm) {

                                        let ConcLowPPM = (resul[j].ConcLowPPM);
                                        let ConcHighPPM = (resul[j].ConcHighPPM);

                                        let conc = (0.054 - 0.000)

                                        // formula for find AQI
                                        let firstEqu = (maxm - min) / (ConcHighPPM - ConcLowPPM);
                                        let secondEqu = (avg - ConcLowPPM);

                                        // step 2nd
                                        let finalCalculation = (firstEqu * secondEqu) + min;


                                        object.aqi = parseInt(avg);

                                        updatedAQIForeCastArr.push(object);
                                        break;
                                    }
                                }

                            }


                            console.log(updatedAQIForeCastArr)

                            const result = updatedAQIForeCastArr.filter(date => {

                                return (new Date(date.day).valueOf() / 1000) > Math.floor(new Date().getTime() / 1000)

                            });
                            console.log(result)
                            results = newResults.slice(0, 7)
                            // results = newResults;
                            updatedAQIForeCastArr = result;
                        

                            res.send({
                                status: 1,
                                results,
                                updatedAQIForeCastArr,
                                cityDetails
                            });
                        });
                    } else {
                        res.status(400).send({
                            status: 0,
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).send({
            status: 0,
        });
        console.log(err);
    }
});

module.exports = router
