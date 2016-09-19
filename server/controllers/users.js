var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var config = require('../config');

var router = express.Router();

router.post('/login', function(req, res) {

  if(!req.body.password) {
    return res.status(400).json({code: 'missingPassword', message: 'Password missing from body'});
  } else if(!req.body.username) {
    return res.status(400).json({code: 'missingUsername', message: 'Username missing from body'});
  } else {

    if(req.body.password === 'test') {

      var token = jwt.sign({username: 'aherriot', role: 'user'}, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRY
      });
      return res.json({token: token});


    } else if(req.body.password === 'admin') {

      var token = jwt.sign({username: 'admin', role: 'admin'}, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRY
      });
      return res.json({token: token});

    }

  }
  return res.status(401).json({code: 'incorrectPassword', message: 'Authentication failed. Incorrect username or password.'});
});

module.exports = router;
