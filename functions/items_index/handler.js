'use strict';

const STATIC_ITEMS = require('../../shared/static_items');

module.exports.handler = function(event, context, cb) {
  return cb(null, {
    data: {
      foods: STATIC_ITEMS
    }
  });
};
