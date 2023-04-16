const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
/*
function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}*/

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.userId = payload.userId;
    next();
  });
}

module.exports = {
  //generateAccessToken,
  authenticateToken,
};

/**
 * Key Learnings:
 * --What does auth.js do--
 * You can see auth.js as a middleware that assists to generate and authenticate tokens
 * 
 * --Exporting and Importing--
 * auth.js exports two functions named generateAccessToken and authenticateToken
 * When importing these functions, take note to import them in their correct order
 * For example, routes.js imports the functions from auth.js like so:
 * const { generateAccessToken, authenticateToken } = require('../middleware/auth'); 
 * Note that generateAccessToken was imported first then authenticateToken
 * */
