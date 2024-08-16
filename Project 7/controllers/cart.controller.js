exports.addToCart = (req, res) => {
    const { productId, quantity } = req.body;
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const cart = req.session.cart;
    const productExists = cart.find(item => item.productId === productId);
    if (productExists) {
        productExists.quantity += parseInt(quantity);
    } else {
        cart.push({ productId, quantity: parseInt(quantity) });
    }
    res.redirect('/cart');
};

exports.viewCart = (req, res) => {
    const cart = req.session.cart || [];
    res.render('cart', { cart });
};

exports.checkout = ( req, res ) => {
    res.render('checkout');
}