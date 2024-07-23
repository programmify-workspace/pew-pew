require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    secure:false,
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})
app.get('/',(req, res) =>{
    res.send('hello world');
    const mailOptions ={
        form:process.env.EMAIL,
        to:process.env.TO_EMAIL,
        subject:'sending Email using Node js',
        text:'that was easy!'
    }
    transporter.sendMail(mailOptions,(error, info) =>{
        if(error){
            console.log(error);
        }else{
            console.log('Email sent: + info.response');
        }
    })
})
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('App listening on port 3000'));
