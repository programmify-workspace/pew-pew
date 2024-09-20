const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'userdata'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

app.get("/users/:id",(req,res) => {
	let id = req.params.id;
	let sql = `SELECT * FROM userdata WHERE ID='${id}'`;
	connection.query(sql, (error,result) => {
		if(error){
			res.status(500).json({
				status:"notok",
				message:"Something went wrong"
			});
		} else {
					res.send(result[0]);
				}
			})
		});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});