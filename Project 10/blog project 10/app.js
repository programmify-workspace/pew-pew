const express = require('express')
const {config, engine} = require('express-edge')

app.use(express.static('public'))
app.use(engine)
app.set('view',  `${__dirname}/views`)



const app =express()

app.get('/', (req, res) =>{
    return res.status(200).json({message: 'Hello Drey'})
})


app.listen(5000, ()=>{
    console.log('server is connected to port 5000')
})