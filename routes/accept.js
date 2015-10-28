/* jshint node: true */

'use strict';

const express = require('express');
const router  = express.Router();

const request = require('request');

const fns = require('../functions');

const Route = require('../route');

router.route('/')

  .post((req, res) => {
    console.log('Accept post called');

    
    res.send({success: true});
  })

  .get((req, res) => {
    fns.isValidToken(req.params.token, () => {
      let slideshow = {};

      request.get(Route.slideshow(req.params.token), (error, _res, body) => {
        body = JSON.parse(body);

        // Mongo outputs an array
        // we need to get the first value
        slideshow = body.slideshow[0];

        // Render template with data
        res.render('remote', {token: req.params.token, slideshow: slideshow});
      });
    }, () => {
      res.render('remote', {token: req.params.token, error: 'Invalid token'});
    });
  });

module.exports = router;