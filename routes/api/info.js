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

module.exports.getAll = function(res) {
  // Grab the entire file
  var content = JSON.parse(fs.readFileSync(file));

  res.json(content);
};

module.exports.get = function(token, res) {
  fns.isValidToken(token, function(valid) {
    if (!valid) return res.sendStatus(400);

    // Grab the entire file
    var content = JSON.parse(fs.readFileSync(file));

    fns.tokenExists(token, content, function(exists, result) {
      if (!exists) return res.sendStatus(400);

      res.json(result);
    });
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