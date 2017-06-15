/**
 * Post.js
 *
 * @description :: Post. It can be photo, video, etc.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {

    // In tumblr exists several types of post
    postType: {
      type: 'string',
      enum: [ 'text', 'photo', 'quote', 'link', 'chat', 'audio', 'video' ],
      required: true,
    },

    // Associations
    author: {
      model: 'user',
      required: true,
    },

    multimedia: {
      model: 'multimedia',
      via: 'post',
    },

    // likedBy: {
    //   collection: 'user',
    //   via: 'likes',
    //   dominant: true,
    // },

    // comments: {
    //   collection: 'comment',
    //   via: 'post',
    //   required: false,
    // },
  },
};
