'use strict';

const merge = require('deepmerge');
const karmaConfig = require('./config/karma');
const webpackConfig = require('./webpack.config');

module.exports = config => {
  config.set(merge(karmaConfig(webpackConfig, __dirname), {
    // ... custom karma configuration
  }));
};
