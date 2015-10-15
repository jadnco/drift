const fs = require('fs');

module.exports = {
  // Check that token is valid
  isValidToken: function(token, callback) {
    token = Number(token) || null;

    if (!this.isInt(token) || String(token).length !== 4) {
      console.log('Invalid token: ', token);

      return callback(false);
    }

    return callback(true);
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
  modify: function(token) {
    console.log(token);
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