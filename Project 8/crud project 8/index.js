const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser') 
const path = require('path')
const port = process.env.port


const app = express()


app.get('/user/:name', (req, res) =>{
    const name = req.params.name
    res.send(`Hello, ${name}`)
})

app.use(bodyParser.json()); // Parses application/json

// Middleware to parse URL-encoded bodies (optional, but often used with form submissions)
app.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-urlencoded

// Handler function for the POST route
const handleSubmit = (req, res) => {
  // Respond with the received data
  res.json({
    receivedData: req.body
  });
};

// Defi 
l
app.post('/submit', handleSubmit);

   
app.set('view engine', 'ejs');

// Define the path for views (EJS templates)
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define the root route
app.get('/', (req, res) => {
  // Render the 'index.ejs' template
  res.render('index', { message: 'Hello, EJS!' });
});

app.get('/', (req, res) => {
    // Example list of users
    const users = [
      { name: 'John Doe', age: 25 },
      { name: 'Jane Smith', age: 30 },
      { name: 'Alice Johnson', age: 22 }
    ];
    
    // Render the 'index.ejs' template with dynamic data
    res.render('index', { users: users });
  });



app.listen(port,()=>{
    console.log('App is connected sucessfully!')
})