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
            var token = jwt.sign({_id: user._id, username: user.username, role: user.role}, config.JWT_SECRET, {
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

        var token = jwt.sign({_id: user._id, username: user.username, role: user.role}, config.JWT_SECRET, {
          expiresIn: config.JWT_EXPIRY
        });

        return res.json({token: token});
      })
    }
  });
});

router.put('/:username', auth, function(req, res) {
  if(req.user.username !== req.params.username) {
    return res.status(400).json({code: 'wrongUser', message: 'Can only edit the currently authenticated user'});
  }

  if(req.body.email) {

  }

  if (req.body.username) {

  }

  res.json({})
})

// Separate route just to change password. requires current password to be reauthenicated.
router.put('/:username/password', auth, function(req, res) {

  if(req.user.username !== req.params.username) {
    return res.status(400).json({code: 'wrongUser', message: 'Can only edit the currently authenticated user'});
  } else if(!req.body.password) {
    return res.status(400).json({code: 'missingPassword', message: 'Password missing from body'});
  } else if(!req.body.newPassword) {
    return res.status(400).json({code: 'missingNewPassword', message: 'New password missing from body'});
  }

  User.findOne({username: req.params.username}, function(err, user) {

    if(err) {
      return res.status(500).json({error: err});
    }

    if(user) {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if(err) {
          return res.status(500).json({error: err});
        }

        if(isMatch) {

          user.password = req.body.newPassword;

          user.save(function(err, user) {
            if(err) {
              return res.status(500).json({error: err});
            }

            return res.json({});

          })

        } else {
          return res.status(401).json({code: 'incorrectPassword', message: 'Authentication failed. Incorrect username or password.'});
        }
      });
    } else {
      return res.status(401).json({code: 'incorrectPassword', message: 'Authentication failed. Incorrect username.'});
    }

  })

});

router.delete('/:username', auth, admin, function(req, res) {

  // testUser.save(function(err) {
  //   if (err) throw err;
  //
  // });

});

module.exports = router;
