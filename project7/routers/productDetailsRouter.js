const express = require('express');
const productDetailsController = require('../controllers/productDetailsController');
const productRouter = express.Router();


productRouter.get('/productDetails/:id', productDetailsController.getProductDetails);

module.exports = productRouter;