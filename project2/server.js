const express = require('express');
const listRouter = require('./routes/listRoutes');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', listRouter);

 
app.listen(PORT, () => {
    console.log("Listening at %d", PORT);
})

