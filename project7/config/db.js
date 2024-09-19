const db = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = db.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root", 
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || "fushop"
}).promise();

pool.getConnection()
   .then(() => {
        console.log("Connected to database Pool");
    })
   .catch(err => {
        console.log("Error connecting to database Pool: ", err);

        process.exit();
    });

module.exports = pool;