import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config.js';

import config from './config';
import api from './api';

const app = express();

app.use('/api', api);

const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
  res.end();
});


app.listen(config.PORT, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎  Listening on port %s. Open localhost:%s', config.PORT, config.PORT);
});
