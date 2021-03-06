/**
 * User.js
 *
 * @description :: Represent a User and its default Blog
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

// Encrypt mode
const bcrypt = require('bcryptjs');

module.exports = {
  schema: true,

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

    encryptedPassword: {
      type: 'String',
      require: true,
    },

    // Blog
    blogName: {
      type: 'string',
      defaultTo: 'untitled',
    },

    // Associations
    posts: {
      collection: 'post',
      via: 'author',
    },

    multimedia: {
      collection: 'multimedia',
      via: 'owner',
    },

    // comments: {
    //   collection: 'comment',
    //   via: 'author',
    // },

    // follower: {
    //   collection: 'user',
    //   via: 'following',
    //   dominant: true,
    // },

    // following: {
    //   collection: 'user',
    //   via: 'follower',
    // },

    // likes: {
    //   collection: 'post',
    //   via: 'likedBy',
    // },

    // Json response comes without the password
    toJSON() {
      const objModelRepresentation = this.toObject();
      delete objModelRepresentation.encryptedPassword;
      return objModelRepresentation;
    },
  },

  // Encrypt plain password before save record
  beforeCreate(values, next) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);

      bcrypt.hash(values.password, salt, (error, hash) => {
        if (error) return next(error);
        values.encryptedPassword = hash;
        next();
      });
    });
  },

  isPasswordValid(password, user, callback) {
    bcrypt.compare(password, user.encryptedPassword, (error, match) => {
      if (error || !match) callback(error);
      else callback(null, true);
    });
  },
};
