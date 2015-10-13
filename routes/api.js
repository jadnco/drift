const express  = require('express');
const router   = express.Router();
const info     = require('./api/info');

router.route('/info/:token')
  .get(function(req, res) {
    info.get(req.params.token, res);
  })
  .post(function(req, res) {
    info.update(req.params.token, req, res);
  });

router.route('/info')
  .get(function(req, res) {
    info.getAll(res);
  });

module.exports = router;