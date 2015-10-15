'use strict';

const fs     = require('fs');
const random = require('random-js')();
const fns    = require('../../functions.js');

const mongoose = require('mongoose');
const Slideshow = require('../../models/slideshow');

var getTotalSlides = function() {
  // count slides directory
};

// Generate random 5 digit integer
var generateToken = function() {
  var token = '';

  token += random.integer(1000, 9999);

  console.log(token);
};

// Create a new slideshow object
module.exports.add = function(req, res) {
  console.log(req.body);
  let slideshow = new Slideshow(req.body.slideshow);

  slideshow.save(function(err) {
    if (err) return res.send(err);

    res.json({slideshow: slideshow});
  });
};

// Get all slideshow objects
module.exports.getAll = function(res) {
  console.time('GET ALL');
  
  Slideshow.find(function(err, slideshows) {
    if (err) return res.send(err);

    res.json({slideshows: slideshows});
  });

  console.timeEnd('GET ALL');
};

module.exports.get = function(token, res) {
  console.time('GET ONE');

  fns.isValidToken(token, function(valid) {
    if (!valid) return res.sendStatus(400);

    // Grab the entire file
    var content = JSON.parse(fs.readFileSync(file));

    fns.tokenExists(token, content, function(exists, result) {
      if (!exists) return res.sendStatus(400);

      res.json(result);
    });
  });

  console.timeEnd('GET ONE');
};

module.exports.update = function(token, req, res) {
  fns.isValidToken(token, function(valid) {
    if (!valid) return res.sendStatus(400);

    // Grab the entire file
    var content = JSON.parse(fs.readFileSync(file));

    fns.tokenExists(token, content, function(exists, result) {
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

module.exports.delete = function() {

};