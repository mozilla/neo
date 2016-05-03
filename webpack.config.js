'use strict';

const merge = require('webpack-merge');
const webpackConfig = require('./config/webpack');

module.exports = merge(webpackConfig(__dirname), {
  // .. custom webpack configuration
});
