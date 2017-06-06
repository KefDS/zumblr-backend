/**
 * AuthController
 *
 * @description :: Manage the auth of the users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
const HttpStatus = require('http-status-codes');

module.exports = {
  index (request, response) {
    const email = request.param('email');
    const password = request.param('password');

    if (!email || !password)
      return response.json(HttpStatus.UNAUTHORIZED, { error: 'email and password required' });

    User.findOne({ email }, (error, user) => {
      if (!user)
        return response.json(HttpStatus.UNAUTHORIZED, { error: 'invalid email or password' });

      User.isPasswordValid(password, user, (error, valid) => {
        if (error)
          return response.json(HttpStatus.UNAUTHORIZED, { error: 'invalid email or password' });

        return valid
          ? response.json({
            user,
            token: user.id,
          })
          : response.json(HttpStatus.UNAUTHORIZED, { error: 'invalid email or password' });
      });
    });
  },
};
