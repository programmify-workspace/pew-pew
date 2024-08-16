const express = require('express'),
      router = express.Router()
const cartController = require('../controllers/cart.controller')

router.post('/cart/add', cartController.addToCart);
router.get('/cart', cartController.viewCart);
router.get('/checkout', cartController.checkout);

module.exports = router;