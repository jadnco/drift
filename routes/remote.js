/* jshint node: true */

'use strict';

const express = require('express');
const router  = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('access');
  });

router.route('/:token')

  .get((req, res) => {
    
    res.render('remote', {token: req.params.token});
  });

module.exports = router;