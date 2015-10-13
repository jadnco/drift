const fs     = require('fs');
const random = require('random-js')();
const fns    = require('../../functions.js');

const file = 'info.json';

var getTotalSlides = function() {
  // count slides directory
};

// Generate random 5 digit integer
var generateToken = function() {
  var token = '';

  token += random.integer(1000, 9999);

  console.log(token);
};

module.exports.get = function(token, res) {
  fns.isValidToken(token, function(valid) {
    if (!valid) return res.sendStatus(400);

    // Grab the entire file
    var content = JSON.parse(fs.readFileSync(file));
    console.log(content);

    // Loop through the file
    for (var i = 0; i < content.length; i++) {
      // Token matches
      if (content[i].token === Number(token)) {
        return res.json(content[i]);
      }
    }

    // Token wasn't found
    console.log('token ' + token + ' wasnt found!');
    res.sendStatus(400);
  });
};

module.exports.update = function(token, req, res) {
  fns.isValidToken(token, function(valid) {
    if (!valid) return res.sendStatus(400);

    
  });
  // Update position in json file
  var updated = req.body;

  fs.writeFile(file, JSON.stringify(updated), function(err) {
    if (err) throw err;

    // Send an OK
    res.sendStatus(200);
  });
};