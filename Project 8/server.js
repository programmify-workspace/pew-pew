// server.js
const express = require('express'),
    app = express()
require('dotenv').config()
const recordsRoutes = require('./routes/records.route')

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', recordsRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});
