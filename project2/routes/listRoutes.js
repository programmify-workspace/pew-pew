const express = require('express');
const listController = require('../controller/listController.js')
const router = express.Router();

router.get('/', listController.allList);

router.post('/add', listController.addToList)

router.post('/update', listController.updateList);

router.post('/changeStatus', listController.changeStatus);

router.post('/delete', listController.deleteList)


module.exports = router;
