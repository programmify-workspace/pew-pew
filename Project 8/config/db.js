const mysql = require('mysql2')
require('dotenv').config()

const dbPool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
});

module.exports = dbPool.promise();
