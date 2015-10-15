'use strict';

const fs     = require('fs');
const random = require('random-js')();
const fns    = require('../../functions.js');

const mongoose = require('mongoose');
const Slideshow = require('../../models/slideshow');


// Generate random 5 digit integer
var generateToken = () => {
  var token = '';

  token += random.integer(1000, 9999);

  console.log(token);
};

// Create a new slideshow object
module.exports.add = (req, res) => {
  console.log(req.body);
  let slideshow = new Slideshow(req.body.slideshow);

  slideshow.save((err) => {
    if (err) return res.send(err);

    res.json({slideshow: slideshow});
  });
};

// Get all slideshow objects
module.exports.getAll = (res) => {
  console.time('GET ALL');
  
  Slideshow.find(function(err, slideshows) {
    if (err) return res.send(err);

    res.json({slideshows: slideshows});
  });

  console.timeEnd('GET ALL');
};

module.exports.get = (token, res) => {
  console.time('GET ONE');

  fns.isValidToken(token, (valid) => {
    if (!valid) return res.sendStatus(400);

    // Grab the entire file
    var content = JSON.parse(fs.readFileSync(file));

    fns.tokenExists(token, content, (exists, result) => {
      if (!exists) return res.sendStatus(400);

      res.json(result);
    });
  });

  console.timeEnd('GET ONE');
};

module.exports.update = (token, req, res) => {
  fns.isValidToken(token, (valid) => {
    if (!valid) return res.sendStatus(400);

    // Grab the entire file
    var content = JSON.parse(fs.readFileSync(file));

    fns.tokenExists(token, content, (exists, result) => {
      if (!exists) return res.sendStatus(400);

      result.position = req.body.position;

      //fns.modify(token, );

      // fns.modify(file, token, content, result, function(err) {
      //   if (err) return res.sendStatus(400);

      //   res.json(result);
      // });
    });
  });
};

module.exports.delete = () => {

};