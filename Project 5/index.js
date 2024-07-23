const nodemailer = require('nodemailer')
require('dotenv').config()

// Reuseable Transporter Object using default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    }
})

const mailOptions = {
    from: {
        name: 'Kavod',
        address: process.env.USER
    },
    to: ['olamujiib@gmail.com'],
    subject: 'Testing',
    html: '<p>Just testing the project oga</p>',
    // For attaching files etc to the mail sent
    // attachments: [
    //    {
    //     filename: 'cv.pdf',
    //     path: path.join(__dirname, 'file.pdf'),
    //     contentType: 'application/pdf'
    //    },
    // ]
}

const sendMail = async (transporter, mailOptions) => {
    try{
        await transporter.sendMail(mailOptions)
        console.log('Email has been sent.')
    } catch (error) {
        console.log(error)
    }
}

sendMail(transporter, mailOptions)