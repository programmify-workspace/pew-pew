const express = require('express');
const router = require('./routes');
const mysql = require('mysql'); // Correct import for mysql package
const PDFDocument = require('pdfkit')
const path = require('path')

const app = express();

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // Correct property name for host
    user: 'root',
    password: '',
    database: 'invoices'
});

// Connect to MySQL
db.connect((error) => {
    if (error){
        throw error;
    }
    console.log('Connected to MySQL database');
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
