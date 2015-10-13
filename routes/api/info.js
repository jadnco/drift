const fs     = require('fs');
const random = require('random-js')();

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

// TODO: query by token (eg. api/info/1348)

module.exports.get = function(req, res) {
  var content = JSON.parse(fs.readFileSync(file));

  // Read json file and get position
  res.json(content);

  generateToken();
};

module.exports.update = function(req, res) {
  // Update position in json file
  var updated = req.body;

  fs.writeFile(file, JSON.stringify(updated), function(err) {
    if (err) throw err;

    // Send an OK
    res.sendStatus(200);
  });
};