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
      console.log('Invalid token: ', token);

      return failure();
    }

    return success();
  },
  // Check that a token exists
  tokenExists: function(token, content, callback) {
    content = content || [];

    // Loop through the file
    for (var i = 0; i < content.length; i++) {
      // Token matches
      if (content[i].token === Number(token)) {
        // Send the content that matches the token
        return callback(true, content[i]);
      }
    }

    console.log('token ' + token + ' wasnt found!');

    // Token doesn't exist
    return callback(false, null);
  },
  modify: function(file, token, result, callback) {
    var content = JSON.parse(fs.readFileSync(file));

    content = JSON.stringify(content);
    
    fs.writeFile(file, content, function(err) {
      if (err) return callback(err) && console.log("can't write to file");

      // Send an OK callback
      callback(null);
    });
  },
  isInt: function(n) {
    return Number(n) === n && n % 1 === 0;
  }
};