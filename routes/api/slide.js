'use strict';

const fs     = require('fs');
const fns    = require('../../functions.js');

const mongoose  = require('mongoose');
const Slide = require('../../models/slide');

const generateToken = require('../../functions').generateToken;

// Create a new slideshow object
module.exports.add = (req, res) => {
  let slide = new Slide(req.body.slide);

  slide.save((err) => {
    if (err) return res.send(err);

    res.json({slide: slide});
  });
};

// Get all slideshow objects
module.exports.getAll = (res) => {
  Slide.find((err, slides) => {
    if (err) return res.send(err);

    res.json({slides: slides});
  });
};

module.exports.get = (query, res) => {
  Slide.find(query, (err, slide) => {
    if (err) return res.send(err);

    res.json({slide: slide});
  });
};

module.exports.update = (query, req, res) => {
  let updated = req.body.slide;

  // Set the modified date
  updated.modified = Date.now();

  Slide.findOneAndUpdate(query, {$set: updated}, (err, slide) => {
    if (err) return res.send(err);

    res.sendStatus(200);
  });
};

module.exports.delete = (query, res) => {
  Slide.findOneAndRemove(query, (err, slide) => {
    if (err || !slide) return res.send(err);

    res.sendStatus(200);
  });
};