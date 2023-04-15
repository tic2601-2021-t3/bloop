const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

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
  generateAccessToken,
  authenticateToken,
};
