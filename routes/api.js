/* jshint node: true */

'use strict';

const express    = require('express');
const router     = express.Router();
const slideshows = require('./api/slideshow');
const query      = require('../functions').query;

router.route('/slideshow/:token')

  // Get the JSON object
  .get((req, res) => {
    // Create query, can select w/ id or token
    let _query = query(req.params.token, {token: req.params.token});

    slideshows.get(_query, res);
  })

  // Update this specific slide
  .put((req, res) => {
    // Create query, can select w/ id or token
    let _query = query(req.params.token, {token: req.params.token});

    slideshows.update(_query, req, res);
  })

  // Delete this slide
  .delete((req, res) => {
    // Create query, can select w/ id or token
    let _query = query(req.params.token, {token: req.params.token});
    
    slideshows.delete(_query, res);
  });

router.route('/slideshows')

  // Get a list of all slideshows
  .get((req, res) => {
    slideshows.getAll(res);
  })

  // Create a new slideshow
  .post((req, res) => {
    slideshows.add(req, res);
  });

module.exports = router;