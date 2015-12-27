var express = require('express');

var api = express();

api.get('/test', function(req, res) {
  res.json({test: 'test'});
});

api.all('*', function(req, res) {
  res.status(404).json({error: 'Path not found'});
});

module.exports = api;
