const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET; 

function authGuard(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({error:true, message: 'Access denied. No token provided.' });
  }

  const formattedToken = token.split(' ')[1];

  try {
    const decoded = jwt.verify(formattedToken, secretKey);
    if(typeof decoded !== "undefined"){
        next() 
        return true
    }else{
        return false
    }
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token or token expired.' });
  }
}

module.exports = {authGuard}
