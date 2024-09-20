import mysql from 'mysql';


//Make MySQL Database Connection
const connection = mysql.createConnection({
	host : 'localhost',
	database : 'projects',
	user : 'root',
});

//Check MySQL Database Connection
connection.connect((err) => {
    if (err) throw err;
	console.log('MySQL Database is connected Successfully');
});

export default connection;