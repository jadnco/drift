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
  isInt: function(n) {
    return Number(n) === n && n % 1 === 0;
  }
};