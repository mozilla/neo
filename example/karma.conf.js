'use strict';

const karmaConfig = require('neo/karma');
const webpackConfig = require('./webpack.config');

module.exports = config => {
  config.set(karmaConfig(webpackConfig, {
    // ... custom karma configuration
  }));
};
