const express = require('express'),
      router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/products/add', (req, res) => {
    res.render('add-product');
});

router.post('/products/add', productController.addProduct);

// Route to display all products
router.get('/products', productController.listProducts);

module.exports = router;