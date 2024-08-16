const connection = require('../config/db')

const Product = {
    getAll: (callback) => {
        connection.query('SELECT * FROM products', callback)
    },
    getById: (id, callback) => {
        connection.query('SELECT * FROM products WHERE id = ?', [id], callback);
    },
};

module.exports = Product;