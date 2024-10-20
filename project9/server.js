const express = require('express');
const path = require('path');
const app = express();
const quizRouter = require('./routes/quizRouter');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/', quizRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));