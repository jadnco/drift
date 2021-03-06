'use strict';

const mongoose  = require('mongoose');

const fns       = require('../../functions');
const Slideshow = require('../../models/slideshow');
const Slide     = require('../../models/slide');

// Create a new slideshow object
module.exports.add = (query, req, res) => {
  let slide = new Slide(req.body.slide);

  Slideshow.findOne(query, (err, slideshow) => {
    if (err) return res.send(err);

    slide.slideshow = slideshow.id;

    slideshow.slides.push(slide.id);

    slide.save((err) => {
      if (err) return res.send(err);

      slideshow.save((err) => {
        if (err) return res.send(err);

        res.json({slide: slide});
      });
    });
  });
};

// Get all slideshow objects
module.exports.getAll = (query, res) => {
  Slideshow.findOne(query, (err, slideshow) => {
    if (err) return res.send(err);

    Slide.find({slideshow: slideshow.id}, (err, slides) => {
      if (err) return res.send(err);

      res.json({slides: slides});
    }).sort('location');
  });
};

module.exports.get = (query, res) => {
  Slide.findById(query, (err, slide) => {
    if (err) return res.send(err);

    res.json({slide: slide});
  });
};

module.exports.update = (query, req, res) => {
  let updated = req.body.slide;

  // Set the modified date
  updated.modified = Date.now();

  Slide.findByIdAndUpdate(query, {$set: updated}, (err, slide) => {
    if (err) return res.send(err);

    res.json(slide);
  });
};

module.exports.delete = (query, res) => {
  Slide.findOneAndRemove(query, (err, slide) => {
    if (err || !slide) return res.send(err);

    res.sendStatus(200);
  });
};
