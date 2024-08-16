const express = require('express'),
    app = express()
const session = require('express-session')
const path = require('path')
require('dotenv').config();
const productRoutes = require('./routes/product.routes')
const cartRoutes = require('./routes/cart.routes')
// const uploadRoutes = require('./routes/upload.routes')

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, '/views'));

// Serve Static file for the product images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/', productRoutes)
app.use('/', cartRoutes)
// app.use('/uploads', uploadRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})