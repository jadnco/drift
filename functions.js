'use strict';

const fs     = require('fs');
const random = require('random-js')();

module.exports = {
  // Query a slideshow by id or token
  query: (id, token) => {
    let query;

    if (id !== undefined) {
      query = {$or: [token]};

      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        query.$or.push({_id: id});
      }
    }

    return query;
  },

  // Generate random 4 digit integer
  generateToken: () => {
    return random.integer(1000, 9999).toString();
  },

  // Check that token is valid
  isValidToken: function(token, success, failure) {
    token = Number(token) || null;

    if (!this.isInt(token) || String(token).length !== 4) {
      return failure();
    }

    return success();
  },

  isInt: function(n) {
    return Number(n) === n && n % 1 === 0;
  },
};
