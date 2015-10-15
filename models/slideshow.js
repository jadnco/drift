'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Slide    = require('./slide');

let SlideshowSchema = new Schema({
  // Unique identifier
  token: {
    type: String,
    unique: true
  },

  // Slide position (relative to `slides`)
  position: {
    type: Number,
    default: 0
  },

  // Count of slides
  slidesCount: Number,

  // Array of slides
  slides: [Slide],

  // Created date
  created: {
    type: Date,
    default: Date.now
  },

  // Date of last modifications
  modified: Date
});

SlideshowSchema.pre('save', (next) => {
  // Update the modified date
  this.modified = Date.now;

  next();
});


module.exports = mongoose.model('Slideshow', SlideshowSchema);