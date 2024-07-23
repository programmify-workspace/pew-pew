const express = require('express');
const mysql = require('mysql');
const shortid = require('shortid');
const path = require('path');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'url_shortener'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
// Home route - form to submit URLs
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Shorten URL route - handle form submission
app.post('/shorten', (req, res) => {
    const longUrl = req.body.longUrl;
    const shortId = shortid.generate();

    // Insert into database
    const sql = 'INSERT INTO urls (long_url, short_id) VALUES (?, ?)';
    db.query(sql, [longUrl, shortId], (err, result) => {
        if (err) throw err;
        console.log('URL inserted into database');

        // Construct short URL
        const shortUrl = `http://localhost:${port}/${shortId}`;
        res.send(`Shortened URL: <a href="${shortUrl}">${shortUrl}</a>`);
    });
});

// Retrieve original URL route
app.get('/:shortId', (req, res) => {
    const shortId = req.params.shortId;

    // Retrieve long URL from database
    const sql = 'SELECT long_url FROM urls WHERE short_id = ?';
    db.query(sql, [shortId], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const longUrl = result[0].long_url;
            res.redirect(longUrl);
        } else {
            res.status(404).send('URL not found');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});