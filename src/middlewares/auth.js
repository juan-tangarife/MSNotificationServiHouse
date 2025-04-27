const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return { message: 'No token provided in the request headers', success: false };
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return { message: 'Token has expired', success: false };
      }
      return { message: err.message, success: false };
    } else {
      return { message: 'Token is valid', success: true };
    }
  });
}

module.exports = verifyToken;
