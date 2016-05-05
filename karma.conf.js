'use strict';

const karmaConfig = require('./config/karma');
const webpackConfig = require('./webpack.config');

module.exports = config => {
  config.set(karmaConfig(webpackConfig, {
    // ... custom karma configuration
  }));
};
