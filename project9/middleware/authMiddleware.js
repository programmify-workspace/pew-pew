const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.protect = (req, res, next) => {
    // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    // const token = req.header('Authorization');
  const token = req.cookies.token;
  // token.replace('Bearer ', '')
  console.log(token);

  if (!token) {
    return res.status(401).redirect('/sign-in');
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
