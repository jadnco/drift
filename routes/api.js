const express  = require('express');
const router   = express.Router();
const info     = require('./api/info');

router.route('/info')
  .get(function(req, res) {
    info.get(res);
  })
  .post(function(req, res) {
    info.update(req, res);
  });

module.exports = router;