const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

app.get('/', function (req, res) {
  res.send("Hello Developer.");
});
app.use('/', require('./routes/UserRoute'));
app.use('/', require('./routes/FrequencyRoute'));
app.use('/', require('./routes/TestRoute'));
app.use('/', require('./routes/ProfileRoute'));
app.use('/', require('./routes/PathologyRoute'));
app.use('/', require('./routes/AirQuality'));
app.use('/',require('./routes/UserRegister'));
app.use('/',require('./routes/TestAssignment'));
app.use('/',require('./routes/Video'));
app.use('/',require('./routes/StatoSalute'));
app.use('/',require('./routes/NotificatioRoute'));
app.use('/',require('./routes/TerapiaRoure'));
app.use('/',require('./routes/UserEmailVeify'));

require('./routes/Schedular')



//Dev

var server = app.listen(5000, function () {
  console.log("Local server is listening on port %s...", server.address().port);
});

//prod

// app.listen(process.env.PORT, process.env.IP, function () {
//   console.log("Production server is listening on port %s...", process.env.PORT);
// })
module.exports = app;



