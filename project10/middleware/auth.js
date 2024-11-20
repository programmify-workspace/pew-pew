const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.protect = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).redirect('/login');
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
      return res.status(403).redirect('/');
  }
};