const express = require('express');
const app = express();
const emailRouter = require('./routes/emailRouter');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', emailRouter);

const PORT = 8000;
app.listen(PORT, () => console.log('listening on port', PORT));