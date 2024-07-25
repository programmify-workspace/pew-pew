const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

async function main (subject, emails, emailTemplate) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 465, 
        secure: true, 
        service: 'gmail',
        auth: {
          user: process.env.APP_USER, 
          pass: process.env.APP_PASSWORD
        }
    });

    const info = await transporter.sendMail({
        from: process.env.APP_USER,
        to: emails,
        subject: subject,
        html: emailTemplate
    });
    console.log("Message sent! ID:", info.messageId);
    console.log(info.accepted);
    console.log(info.rejected);
};

module.exports = (req, res) => {

    let {subject, email, emails, message} = req.body;

    emails = emails ? JSON.parse(emails) : [];
    console.log(emails); 

    if (email) {
        emails.push(email);
    }

    const emailTemplate = `
        <p>${message}</p>
    `;
    main(subject, emails, emailTemplate).catch(e => console.log(e));
    
    res.redirect('/');
}