'use strict';

const path = require('path');
const bootstrap = require('./config/bootstrap');
const clean = require('./config/clean');
const css = require('./config/css');
const chunk = require('./config/chunk');
const define = require('./config/define');
const html = require('./config/html');
const js = require('./config/js');
const uglify = require('./config/uglify');

const SRC = path.resolve(__dirname, 'src');
const BUILD = path.resolve(__dirname, 'build');
const IS_PROD = process.env.npm_lifecycle_event === 'build';

let plugins = [chunk, define];

if (IS_PROD) {
  plugins.push(clean);
  plugins.push(uglify)
}

module.exports = {
  devtool: IS_PROD ? 'cheap-eval-source-map' : 'hidden-source-map',
  entry: [
    path.join(SRC, 'index')
  ],
  output: {
    path: BUILD,
    filename: 'bundle.js'
  },
  module: {
    loaders: [html, css, js, bootstrap.woff, bootstrap.other]
  },
  plugins,
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  devServer: {
    contentBase: SRC,
    stats: 'errors-only'
  }
};
