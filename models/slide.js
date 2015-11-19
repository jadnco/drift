'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let SlideSchema = new Schema({
  // Location/position of slide
  location: Number,

  // HTML content
  content: String,

  slideshow: {
    type: Schema.Types.ObjectId,
    ref: 'Slideshow',
  },
});

module.exports = mongoose.model('Slide', SlideSchema);
