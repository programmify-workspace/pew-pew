const mysql = require('mysql2');
require('dotenv').config();

const dbConnect = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
});

dbConnect.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
    } else {
        console.log('Connected to the database.');
        connection.release();
    }
});

module.exports = dbConnect;
