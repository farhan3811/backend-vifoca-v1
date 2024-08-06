const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret } = require('../config/jwtConfig'); // Pastikan Anda memiliki konfigurasi secret untuk JWT

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Jika token tidak ada

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // Token tidak valid
    req.user = user;
    next();
  });
};
const authorizeRole = (...roles) => {
    return (req, res, next) => {
      if (roles.includes(req.user.role)) {
        next(); // Jika peran pengguna sesuai dengan salah satu dari peran yang diizinkan
      } else {
        res.sendStatus(403); // Tidak diizinkan
      }
    };
  };
  
  module.exports = { authorizeRole };
  

module.exports = { authenticateToken };
