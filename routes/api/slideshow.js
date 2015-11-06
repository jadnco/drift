'use strict';

const fns       = require('../../functions.js');
const mongoose  = require('mongoose');
const Slideshow = require('../../models/slideshow');

const generateToken = require('../../functions').generateToken;

// Create a new slideshow object
module.exports.add = (req, res) => {
  let slideshow = new Slideshow(req.body.slideshow);

  // Generate a token value
  if (slideshow.token === undefined) {
    slideshow.token = generateToken();
  }

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