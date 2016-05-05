'use strict';

const webpackConfig = require('neo/webpack');

module.exports = webpackConfig(
  __dirname,
  // html config
  { title: 'some app'
  },

  // .. custom webpack configuration
  {}

);
