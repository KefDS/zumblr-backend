/**
 * Multimedia.js
 *
 * @description :: TODO: An assets. Can be img, video, etc. It uploads before the post id created
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    multiType: {
      type: 'string',
      enum: [ 'photo', 'video' ],
      required: true,
    },

    path: {
      type: 'String',
      required: true,
    },

    // Associations
    owner: {
      model: 'user',
      required: true,
    },

    // It should links with a post when the post is created
    post: {
      model: 'post',
      required: false,
    },
  },
};

