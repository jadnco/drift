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
  isInt: function(n) {
    return Number(n) === n && n % 1 === 0;
  }
};