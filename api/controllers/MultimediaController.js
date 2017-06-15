/**
 * MultimediaController
 *
 * @description :: Server-side logic for managing multimedia
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const uuid = require('uuid4');
const HttpStatus = require('http-status-codes');

module.exports = {
  create (request, response) {
    request.file('asset').upload({ maxBytes: 10000000 }, (error, uploadedFile) => {
      if (error) return response.negotiate(error);

      if (uploadedFile.length === 0)
        return response.badRequest('No file was uploaded');

      const assetUrl = require('util').format('%s/assets/%s', sails.config.appUrl, uuid());

      Multimedia.create({
        owner: request.token.id,
        url: assetUrl,
        path: uploadedFile[0].fd,
      })
      .then(multimedia => response.json(HttpStatus.CREATED, multimedia.id))
      .catch(error => response.negotiate(error));
    });
  },
};
