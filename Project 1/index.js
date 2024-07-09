const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
require('express-async-errors')

const db = require('./db'),
    employeeRoutes = require('./Controllers/employee.controllers')


// Middleware
app.use(bodyParser.json())
app.use('/api/employees', employeeRoutes)

// Error Handling
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something Went Wrong!')
})


// Step 1: Connection to DB
// Step 2: Start Express Server
db.query("SELECT 1")
    .then(() => {
        console.log('DB Connection Successfully.')
        app.listen(3000,
            () => console.log('Server Started at 3000')
        )
    })
    .catch(err => console.log('DB connection fail. \n' + err))