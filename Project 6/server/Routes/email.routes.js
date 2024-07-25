const express = require('express'),
      router = express.Router()
const { sendMail } = require('../Controllers/mail.controller')

// Route to send mail
router.post('/send-mail', sendMail)

module.exports = router;