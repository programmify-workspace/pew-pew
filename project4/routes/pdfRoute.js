const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/generate-pdf', pdfController.generatePDF);


module.exports = router;