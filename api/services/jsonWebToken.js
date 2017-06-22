/**
 * jsonWebToken
 *
 * @description :: JSON Webtoken Service
 */

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET_TOKEN;
const expiresInMinutes = parseInt(process.env.JWT_TOKEN_DURATION_MINUTES) || 180;

// Creates a token from payload
function generateToken (payload) {
  return jwt.sign(payload, secret, { /* expiresIn: expiresInMinutes*/ });
}

// Verify token on a request
function verify (token, callback) {
  return jwt.verify(token, secret, {}, callback);
}

module.exports = {
  generateToken,
  verify,
};
