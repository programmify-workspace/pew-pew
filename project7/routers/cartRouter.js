const express = require('express');
const cartController = require('../controllers/cartController');
const cartRouter = express.Router();

cartRouter.post('/cart', cartController.addToCart);
cartRouter.get('/cart', cartController.getCart);
// cartRouter.post('/checkout', cartController.checkout);
cartRouter.post('/delete-cart-item', cartController.removeFromCart);
cartRouter.delete('/clear-cart', cartController.clearCart);

// cartRouter.post('/checkout', cartController.checkout);

module.exports = cartRouter;