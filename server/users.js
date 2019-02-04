const fs = require('fs');
const path = require('path');
const token = require('./token');

const userdb = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'db', 'users.json'), 'UTF-8'),
);

// Retrieve user from database
function getUserFromDB({ email, password }) {
  return userdb.users.find(user => user.email === email && user.password === password);
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return Boolean(getUserFromDB({ email, password }));
}

// Retrieve user data from token
function getUser(providedToken) {
  const { email, password } = token.verifyToken(providedToken);
  return getUserFromDB({ email, password });
}

// Create token for login
function loginMiddleware(req, res) {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 404;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  const accessToken = token.createToken({ email, password });
  res.status(200).json({
    access_token: accessToken,
    expires_in: token.expiresIn.int,
  });
}

// Validate user's token
function validateToken(req, res, next) {
  if (
    !req.headers.authorization
    || req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Error in authorization';
    res.status(status).json({ status, message });
    return;
  }
  try {
    token.verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({ status, message });
  }
}

// Return user's profile
function getProfile(req, res) {
  const userData = getUser(req.headers.authorization.split(' ')[1]);
  res.status(200).json(userData);
}

exports.getProfile = getProfile;
exports.loginUser = loginMiddleware;
exports.validateToken = validateToken;
