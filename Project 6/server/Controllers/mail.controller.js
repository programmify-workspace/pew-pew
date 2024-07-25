const nodemailer = require('nodemailer')

// Configire Nodemailer Transport
const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    }
})

// Controller Function to send mail
const sendMail = (req, res) => {
    const { name, email, message } = req.body

    const mailOptions = {
        from: email,
        to: process.env.USER,
        subject: `New Message from ${name}`,
        text: message,
    }

    Transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error Sending Mail: ', error)
    
            // Error Message to Client
            res.send.status(500).json({ message: 'Failed To Send Mail', error: error.toString() })
        }
        res.status(200).json({ message: 'Email Sent Successfully! '})
    })
}

module.exports = { sendMail }