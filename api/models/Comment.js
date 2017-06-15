/**
 * Comment.js
 *
 * @description ::  Represent a single Post's comment
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    content: {
      type: 'text',
      required: true,
    },

    // Associations
    // author: {
    //   model: 'user',
    //   required: true,
    // },

    // post: {
    //   model: 'post',
    //   required: true,
    // },
  },
};

