'use strict';

module.exports.handler = function(event, context, cb) {
  return cb(null, {
    accessToken: event.accessToken,
    body: event.body,
    bodyType: typeof event.body
  });
};
