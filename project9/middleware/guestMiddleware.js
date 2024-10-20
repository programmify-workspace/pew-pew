const jwt = require('jsonwebtoken');

exports.ensureGuest = (req, res, next) => {
    const token = req.cookies.token;
    
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            // If token is valid, redirect to home
            return res.redirect('/');
        } catch (err) {
            // If token is invalid, clear it and continue to auth pages
            res.clearCookie('token');
        }
    }
    // No token or invalid token, proceed to auth pages
    next();
};
