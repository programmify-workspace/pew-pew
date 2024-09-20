import mysql from 'mysql';

const data = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'projects'
});

data.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

export default data;