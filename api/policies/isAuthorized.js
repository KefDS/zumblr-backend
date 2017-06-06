/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

const HttpStatus = require('http-status-codes');

module.exports = (request, response, next) => {
  let token;

  if (request.headers && request.headers.authorization) {
    const parts = request.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) token = credentials;
    } else
      return response.json(HttpStatus.UNAUTHORIZED, { error: 'Format is Authorization: Bearer [token]' });
  } else if (request.param('token')) {
    token = request.param('token');
    // We delete the token from param to not mess with blueprints
    delete request.query.token;
  } else
    return response.json(HttpStatus.UNAUTHORIZED, { error: 'No Authorization header was found' });

  jsonWebToken.verify(token, (error, token) => {
    if (error)
      return response.json(HttpStatus.UNAUTHORIZED, { error: 'Invalid Token!' });
    request.token = token; // This is the decrypted token or the payload you provided
    next();
  });
};
