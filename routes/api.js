/* jshint node: true */

'use strict';

const express   = require('express');
const router    = express.Router();
const slideshows = require('./api/slideshow');

router.route('/slideshow/:token')
  .get(function(req, res) {
    slideshows.get(req.params.token, res);
  })
  .put(function() {

  })
  .delete(function() {

  });

router.route('/slideshows')
  .get(function(req, res) {
    slideshows.getAll(res);
  })
  .post(function(req, res) {
    slideshows.add(req, res);
  });

module.exports = router;