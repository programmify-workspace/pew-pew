const express = require('express'),
    router = express.Router();
const recordsController = require('../controllers/records.controller');

// CRUD Routes
router.get('/', recordsController.listRecords);
router.post('/create', recordsController.createRecord);
router.post('/update/:id', recordsController.updateRecord);
router.post('/delete/:id', recordsController.deleteRecord);

module.exports = router;
