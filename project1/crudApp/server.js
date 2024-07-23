const express = require('express');
const db = require('./config/database');
const userRouter = require('./routes/userRouter');
const bodyParser = require('body-parser');
const path = require('path');
// const methodOverride = require('method-override');

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', userRouter);

 
app.listen(PORT, () => {
    console.log("Listening at %d", PORT);
})

