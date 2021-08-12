let mysql = require('mysql');
const dbConnection = mysql.createPool({
    connectionLimit: 1000,
    host: '206.189.57.74',
    user: 'sanganan',
    password: 'sanganan',
    database: 'io_respiro_dev'
});
module.exports = dbConnection;
