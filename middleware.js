const jwt = require('jsonwebtoken');

function authenticationMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        res.redirect('/users/login')
    }
  
    jwt.verify(token,  process.env.secret_key , (err, decoded) => {
      if (err) {
        res.redirect('/users/login');
      }
      req.userId = decoded.userId;
      next();
    });
  }

module.exports = authenticationMiddleware