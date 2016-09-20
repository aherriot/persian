var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = require('../models/User');
var config = require('../config');

var auth = require('../middlewares/auth');
var admin = require('../middlewares/admin');

var router = express.Router();

router.get('/', auth, admin, function(req, res) {

  User.find({}, function(err, users) {
    if(err) {
      return res.status(500).json({ error: err });
    }
    return res.json(users);
  });
})

router.post('/login', function(req, res) {

  if(!req.body.password) {
    return res.status(400).json({code: 'missingPassword', message: 'Password missing from body'});
  } else if(!req.body.username) {
    return res.status(400).json({code: 'missingUsername', message: 'Username missing from body'});
  } else {

    User.findOne({username: req.body.username}, function(err, user) {

      if(err) {
        return res.status(500).json({error: err});
      }

      if(user) {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if(err) {
            return res.status(500).json({error: err});
          }

          if(isMatch) {
            var token = jwt.sign({username: user.username, role: user.role}, config.JWT_SECRET, {
              expiresIn: config.JWT_EXPIRY
            });

            return res.json({token: token});

          } else {
            return res.status(401).json({code: 'incorrectPassword', message: 'Authentication failed. Incorrect username or password.'});
          }

        })
      } else {
        return res.status(401).json({code: 'incorrectPassword', message: 'Authentication failed. Incorrect username.'});
      }

    })
  }
});

router.post('/', function(req, res) {

  if(!req.body.username) {
    return res.status(400).json({code: 'missingUsername', message: 'Username missing from body'});
  } else if(req.body.username.length < 3 || req.body.username.length > 10) {
    return res.status(400).json({code: 'usernameLength', message: 'Username must be between 3 and 10 characters'});

  } else if(!req.body.password) {
    return res.status(400).json({code: 'missingPassword', message: 'Password missing from body'});
  } else if(req.body.password.length < 6 || req.body.password.length > 30) {
    return res.status(400).json({code: 'passwordLength', message: 'Password must be between 6 and 30 characters'});

  } else if(!req.body.email) {
    return res.status(400).json({code: 'missingEmail', message: 'Email missing from body'});
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(req.body.email)) {
    return res.status(400).json({code: 'invalidEmail', message: 'Email is not valid'});
  }

  User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}, function(err, user) {
    if(err) {
      return res.status(500).json({errror: err});
    }

    if(user) {
      if(user.username === req.body.username) {
        res.status(400).json({code: 'duplicateUsername', message: 'Username already in use'});
      } else {
        res.status(400).json({code: 'duplicatePassword', message: 'email already in use'});
      }
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      });

      newUser.save(function(err, user) {
        if(err) {
          return res.status(500).json({error: err});
        }

        var token = jwt.sign({username: user.username, role: user.role}, config.JWT_SECRET, {
          expiresIn: config.JWT_EXPIRY
        });

        return res.json({token: token});
      })
    }
  });
});

router.put('/', function(req, res) {

  // testUser.save(function(err) {
  //   if (err) throw err;
  //
  // }

});

router.delete('/:username', function(req, res) {

  // testUser.save(function(err) {
  //   if (err) throw err;
  //
  // });

});

module.exports = router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoidXNlciIsImlhdCI6MTQ3NDMzNTczOCwiZXhwIjoxNDc0NDIyMTM4fQ.brU4FFlZBG8PaLAP3LtJ65eVT0MQLlBvi1b2aDgQkyk
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoZXJyaW90Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE0NzQzMzYxMjksImV4cCI6MTQ3NDQyMjUyOX0._aDfZQsmCtkHSK-AnRU4FrP-qmrwPvGEivhcQnRTWyQ
