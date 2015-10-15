'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let SlideSchema = new Schema({
  // Location/position of slide
  location: Number,

  // HTML content
  content: String
});

module.exports = SlideSchema;