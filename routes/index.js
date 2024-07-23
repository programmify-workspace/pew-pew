
const express = require('express');
const path = require('path');
const pdfService = require('../service/pdf-service');
const fs = require('fs');
const router = express.Router();

// Serve the HTML form
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

// Handle form submission and generate PDF
router.post('/generate-pdf', (req, res) => {
    const { heading, content } = req.body;

    const filePath = path.join(__dirname, '../public/invoice.pdf');
    const writeStream = fs.createWriteStream(filePath);

    pdfService.buildPDF(
        (chunk) => writeStream.write(chunk),
        () => {
            writeStream.end();
            res.json({ url: '/invoice.pdf' });
        },
        heading,
        content
    );
});

module.exports = router;