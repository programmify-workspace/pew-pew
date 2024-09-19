const dbPool = require('../config/db');

const exploreController = {
    getProducts: async (req, res) => {
        console.log("Getting items..");
        try {
            const [result] = await dbPool.query('SELECT * FROM items');
            // console.log(result);
            console.log("Session cart:", req.session.cart);

            let itemsWithCartChecker;
    
            if (req.session.cart && req.session.cart.length > 0) {
                const cartItemIds = req.session.cart.map(item => item.id.toString());
                console.log("Cart item IDs:", cartItemIds);
    
                itemsWithCartChecker = result.map(item => ({
                    ...item,
                    cartChecker: cartItemIds.includes(item.id.toString())
                }));
            } else {
                itemsWithCartChecker = result.map(item => ({
                    ...item,
                    cartChecker: false
                }));
            }
    
            console.log("Items with cart checker:", itemsWithCartChecker);
            res.render('index', { items: itemsWithCartChecker });

        } catch (error) {
            console.error(`error: "${error}"`);
            res.status(500).send(`Uh uh! Fushop seems to have experienced an error: "${error}"`);
        }
    }
}

module.exports = exploreController;