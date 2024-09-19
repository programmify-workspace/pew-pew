const checkoutController = {
    postCheckout: async (req, res) => {
        try {
    
            if (!req.body || !req.body.productId || !req.body.productTitle) {
                return res.status(400).send("Missing product information.");
            }
    
            const { productId, productTitle, productDescr, productPrice, productImg, productQuantity, cartChecker } = req.body;
    
            console.log(productId, productTitle, productDescr, productPrice, productImg, productQuantity, cartChecker);
            
            const item = {
                id: productId,
                name: productTitle,
                descr: productDescr,
                price: productPrice,
                img: productImg,
                quantity: productQuantity,
                cartChecker: cartChecker
            };
            
            console.log('Item quantity is: ' + item.quantity);
    
            // To ensure items is always an array
            const items = Array.isArray(item) ? item : [item];
    
            res.render('checkout', { items: items });
        } catch (error) {
            console.error(`error: "${error}"`);
            res.status(500).send(`Uh uh! Fushop seems to have experienced an error: "${error}"`);
        }
    },
    getCheckout: async (req, res) => {
        try {
            let items = req.session.cart || [];
            let errMsg = '';
    
            if (items.length === 0) {
                console.log("No items found");
                errMsg = "No items found! Try adding one to the cart (;";
            } else {
                console.log(items);
            }
            
            res.render('checkout', { items, errMsg });
        } catch (error) {
            console.error(`error: "${error}"`);
            res.status(500).send(`Uh uh! Fushop seems to have experienced an error: "${error}"`);
        }
    }
}

module.exports = checkoutController;