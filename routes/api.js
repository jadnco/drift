/* jshint node: true */

'use strict';

const express    = require('express');
const router     = express.Router();
const slideshows = require('./api/slideshow');
const slides     = require('./api/slide');
const query      = require('../functions').query;

router.route('/slideshow/:token/slides')

  // Get the JSON object
  .get((req, res) => {
    let _query = query(req.params.token, {token: req.params.token});

    slides.getAll(_query, res);
  })

  // Create a new slideshow
  .post((req, res) => {
    let _query = query(req.params.token, {token: req.params.token});

    slides.add(_query, req, res);
  });

router.route('/slide/:id')

  .get((req, res) => {
    slides.get(req.params.id, res);
  })

  // Create a new slideshow
  .put((req, res) => {
    slides.update(req.params.id, req, res);
  });

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