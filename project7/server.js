const express = require('express');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const exploreRouter = require('./routers/exploreRouter');
const cartRouter = require('./routers/cartRouter');
const productDetailsRouter = require('./routers/productDetailsRouter');
const checkoutRouter = require('./routers/checkoutRouter');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || '12345', // Replace with a secure random key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 30 * 60 * 60 * 1000, secure: false} // Set to true if using HTTPS
}));

app.use('/', exploreRouter);
app.use('/', productDetailsRouter);
app.use('/', cartRouter);
app.use('/', checkoutRouter);

app.listen(PORT, () => console.log(`server running at PORT ${PORT}`));