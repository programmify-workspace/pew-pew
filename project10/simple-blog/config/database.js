import mysql from 'mysql2';

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'simple_blog'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

export default db;