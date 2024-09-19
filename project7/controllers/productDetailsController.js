const dbPool = require('../config/db');

const productDetailsController = {
    getProductDetails: async (req, res) => {
        console.log("Getting items..");
        try {

            const productId = req.params.id;

            console.log(productId);

            const [results, fields] = await dbPool.query('SELECT * FROM items WHERE id = ?', [productId]);
            
            console.log(results);

            if (results.length === 0) {
                res.status(404).send('Product not found');
            }
            
            res.render('product-details', { items: results });
        } catch (error) {
            console.error(`error: "${error}"`);
            res.status(500).send(`Uh uh! Fushop seems to have experienced an error: "${error}"`);
        }
    }
}

module.exports = productDetailsController;