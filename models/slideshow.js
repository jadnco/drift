const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Slide    = require('./slide');

var SlideshowSchema = new Schema({
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

module.exports = mongoose.model('Slideshow', SlideshowSchema);