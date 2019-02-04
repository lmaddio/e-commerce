const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';

const expiresIn = {
  str: 60 * 30,
  int: 30,
};

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn.str });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

exports.expiresIn = expiresIn;
exports.createToken = createToken;
exports.verifyToken = verifyToken;
