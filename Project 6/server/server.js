const express = require('express'),
      app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT
const mailRouter = require('./Routes/email.routes')

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', mailRouter)

// PORT LISTEN
app.listen(port, () => {
    console.log(`Server Listening at ${port}`)
})