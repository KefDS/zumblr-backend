/**
 * MultimediaController
 *
 * @description :: Server-side logic for managing multimedia
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const HttpStatus = require('http-status-codes');

module.exports = {
  create (request, response) {
    request.file('asset').upload({ maxBytes: 10000000 }, (error, uploadedFile) => {
      if (error) return response.negotiate(error);

      if (uploadedFile.length === 0)
        return response.badRequest('No file was uploaded');

      Multimedia.create({
        multiType: request.param('multiType'),
        owner: request.token.id,
        path: uploadedFile[0].fd,
      })
        .then(multimedia => response.json(HttpStatus.CREATED, multimedia.id))
        .catch(error => response.negotiate(error));
    });
  },

  findOne (request, response) {
    const Path = require('path');
    const fs = require('fs');

    Multimedia.findOne({ id: request.param('id') })
      .then(value => {
        // If a relative path was provided, resolve it relative
        // to the cwd (which is the top-level path of this sails app)
        fs.createReadStream(Path.resolve(value.path))
          .on('error', err => response.serverError(err))
          .pipe(response);
      })
      .catch(error => response.json(HttpStatus.INTERNAL_SERVER_ERROR));
  },
};
