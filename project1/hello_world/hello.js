const express = require('express');
const hello = express();
const Port = 3000;

hello.get('/', (req, res) => {
    console.log(...req.url)
    res.send("Hello World");
})

hello.listen(Port, () => {
    console.log(`Server is listening at ${Port}`)
})