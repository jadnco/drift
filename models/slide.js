const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var SlideSchema = new Schema({
  // Location/position of slide
  location: String,

  // HTML content
  content: String
});

module.exports = SlideSchema;