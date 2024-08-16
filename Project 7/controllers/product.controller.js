const Product = require('../models/product.model');
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const connection = require('../config/db');

const uploadDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + path.extname(file.originalname));
    }
});


// Get Products
exports.listProducts = (req, res) => {
    const query = 'SELECT * FROM products';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('Error retrieving products.');
        }
        res.render('products', { products: results }); 
    });
};
const upload = multer({ storage })

exports.addProduct = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Upload Error:', err);
            return res.status(500).send('Error uploading file.');
        }

        const imageUrl = req.file ? req.file.filename : null;
        const { name, description, price, stock } = req.body;

        // Save product to database
        const query = 'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [name, description, price, stock, imageUrl], (err) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).send('Error saving product to database.');
            }

            res.redirect('/products');
        });
    });
};
