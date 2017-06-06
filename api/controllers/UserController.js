/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const HttpStatus = require('http-status-codes');

module.exports = {
  create (request, response) {
    // Check if password and password confirm matches
    if (request.body.password !== request.body.confirmPassword)
      return response.json(HttpStatus.UNAUTHORIZED, { error: 'Password does not match' });

    User.create(request.body).exec(
      (error, user) =>
        error
          ? response.json(error.status, { error })
          : response.json(HttpStatus.CREATED, {
            user,
            token: jsonWebToken.generateToken({ id: user.id }),
          })
    );
  },
};
