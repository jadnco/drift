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
  let slideshow = new Slideshow(req.body.slideshow);

  slideshow.save((err) => {
    if (err) return res.send(err);

    res.json({slideshow: slideshow});
  });
};

// Get all slideshow objects
module.exports.getAll = (res) => {
  Slideshow.find((err, slideshows) => {
    if (err) return res.send(err);

    res.json({slideshows: slideshows});
  });
};

module.exports.get = (query, res) => {
  Slideshow.find(query, (err, slideshow) => {
    if (err) return res.send(err);

    res.json({slideshow: slideshow});
  });
};

module.exports.update = (query, req, res) => {
  let updated = req.body.slideshow;

  // Set the modified date
  updated.modified = Date.now();

  Slideshow.findOneAndUpdate(query, {$set: updated}, (err, slideshow) => {
    if (err) return res.send(err);

    res.sendStatus(200);
  });
};

module.exports.delete = (query, res) => {
  Slideshow.findOneAndRemove(query, (err, slideshow) => {
    if (err || !slideshow) return res.send(err);

    res.sendStatus(200);
  });
};