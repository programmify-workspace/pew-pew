const express = require('express');
const checkoutRouter = express.Router();
const checkoutController = require('../controllers/checkoutController');

checkoutRouter.get('/checkout', checkoutController.getCheckout);
checkoutRouter.post('/checkout', checkoutController.postCheckout);    

module.exports = checkoutRouter;