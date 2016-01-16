/* eslint no-console:0 */
var path = require('path');
var express = require('express');

var config = require('./config');
var api = require('./api');

const app = express();

// api in api.js file
app.use('/api', api);

// static files are served from this directory.
app.use(express.static(__dirname + '/../dist'));

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(config.PORT, function onStart(err) {
  if (err) {
    console.error(err);
  }
  console.info('==> 🌎  Listening on port %s', config.PORT);
});
