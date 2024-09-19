const dbPool = require('../config/db');

const cartController = {
    getCart: async (req, res) => {
        console.log("Getting cart items...");
        try {
            let items = req.session.cart || [];
            let errMsg = '';
    
            if (items.length === 0) {
                console.log("No items found");
                errMsg = "No items found! Try adding one to the cart (;";
            } else {
                console.log(items);
            }
    
            res.render('cart', { items, errMsg });

        } catch (error) {
            console.error(`error: "${error}"`);
            res.status(500).send(`Uh uh! Fushop seems to have experienced an error: "${error}"`);
        }
    },
    addToCart: async (req, res) => {
        console.log("Adding to cart..");
    
        try {
            if (!req.body || !req.body.productId || !req.body.productTitle) {
                return res.status(400).send("Missing product information.");
            }
    
            const { productId, productTitle, productDescr, productPrice, productImg, productQuantity, cartChecker } = req.body;

            console.log(productId, productTitle, productDescr, productPrice, productImg, cartChecker);

            console.log('Item quantity is: ' + productQuantity);
            
            const item = {
                id: productId,
                name: productTitle,
                descr: productDescr,
                price: productPrice,
                img: productImg,
                quantity: productQuantity,
                cartChecker: true
            };
    
            // Initialize cart in session if it doesn't exist
            if (!req.session.cart) {
                req.session.cart = [];
            }
    
            // Check for existing item
            const existingItem = req.session.cart.find(i => i.id === productId);
            if (existingItem) {
                // Optionally update quantity or handle duplicates
            } else {
                // Add the new item to the cart
                req.session.cart.push(item);
            }
    
            console.log(req.session.cart);
    
            // Render the cart view with the items
            res.render('cart', { items: req.session.cart });

        } catch (error) {
            console.error(`Error: "${error.message}"`);
            res.status(500).send(`Uh oh! There was an error: "${error.message}"`);
        }
    },
    removeFromCart: async (req, res) => {
        console.log("Removing from cart..");

        try {
            const { productId, productTitle } = req.body;

            console.log(productId, productTitle);

            const item = req.session.cart.find(i => i.id === productId);

            console.log(item);

            if (item) {
                req.session.cart = req.session.cart.filter(i => i.id !== productId);
                res.redirect('/cart');
            }
            
            console.log("huh");

        } catch (error) {
            console.error(`error: "${error}"`);
            res.send(`Uh uh! Fushop seems to have experienced an error: "${error}"`).status(500);
        }
    },
    clearCart: async (req, res) => {
        console.log("Clearing cart..");

        try {
            
        } catch (error) {
            console.error(`error: "${error}"`);
            res.send(`Uh uh! Fushop seems to have experienced an error: "${error}"`).status(500);
        }
    }
}

module.exports = cartController;