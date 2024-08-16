const express = require('express'),
      app = express()
const quizRoutes = require('./routes/quiz.routes')

// Middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.use('/', quizRoutes)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})