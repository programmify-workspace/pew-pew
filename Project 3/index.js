const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.static("public"));
app.use(express.json());

// Import
const db = require('./db/database')
const shorturlModel = require('./models/shorturl.model')

app.get("/",function(request,response){
	response.sendFile(__dirname + "/public/index.html");
});

// Use shorturl import
app.use(shorturlModel)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server Listening at Port ${PORT}.`)
})