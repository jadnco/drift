'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let SlideshowSchema = new Schema({
  // Unique identifier
  token: {
    type: String,
    unique: true,
  },

  // Slide position (relative to `slides`)
  position: {
    type: Number,
    default: 0,
  },

  // Array of slide references
  slides: [{
    type: Schema.Types.ObjectId,
    ref: 'Slide',
  }, ],

  // Created date
  created: {
    type: Date,
    default: Date.now,
  },

  title: String,
  description: String,
  author: String,

  // Date of last modifications
  modified: Date,
});

module.exports = mongoose.model('Slideshow', SlideshowSchema);