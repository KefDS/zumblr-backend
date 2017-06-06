/**
 * Post.js
 *
 * @description :: Post. It can be photo, video, etc.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    description: { type: 'String' },

    // Associations
    author: { model: 'user' },
  },
};
