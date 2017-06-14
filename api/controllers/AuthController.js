/**
 * AuthController
 *
 * @description :: Manage the auth of the users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
const HttpStatus = require('http-status-codes');

module.exports = {
  index (request, response) {
    const emailOrPasswordIncorrect = { error: 'email and password required' };

    const email = request.param('email');
    const password = request.param('password');

    if (!email || !password)
      return response.json(HttpStatus.UNAUTHORIZED, emailOrPasswordIncorrect);

    User.findOne({ email }, (error, user) => {
      if (!user)
        return response.json(HttpStatus.UNAUTHORIZED, emailOrPasswordIncorrect);

      User.isPasswordValid(password, user, (error, valid) => {
        if (error)
          return response.json(HttpStatus.UNAUTHORIZED, emailOrPasswordIncorrect);

        return valid
          ? response.json({
            user: user.toJSON(),
            token: jsonWebToken.generateToken(user.id),
          })
          : response.json(HttpStatus.UNAUTHORIZED, emailOrPasswordIncorrect);
      });
    });
  },
};
