import mysql from 'mysql2';

// Your MySQL connection settings
const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'quiz_db'
  });
  
  connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('MySQL connected...');
  });

export default connection;
