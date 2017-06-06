/**
 * User.js
 *
 * @description :: Represent a zumblr User
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

// Encrypt mode
const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true,
    },
    username: {
      type: 'String',
      required: true,
      unique: true,
    },
    encryptedPassword: { type: 'String' },
  },

  // Json response comes without the password
  toJson () {
    const objModelRepresentation = this.toObject();
    delete objModelRepresentation.encryptedPassword;
    return objModelRepresentation;
  },

  // Encrypt plain password before save record
  beforeCreate (values, next) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);

      bcrypt.hash(values.password, salt, (error, hash) => {
        if (error) return next(error);
        values.encryptedPassword = hash;
        next();
      });
    });
  },

  isPasswordValid (password, user, callback) {
    bcrypt.compare(password, user.encryptedPassword, (error, match) => {
      if (error || !match) callback(error);
      else callback(null, true);
    });
  },
};
