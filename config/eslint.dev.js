'use strict';

const core = require('./eslint.core');
const merge = require('deepmerge');

module.exports = merge(core, {
  rules: {
    'no-console': 0,
    'no-unused-vars': 1
  }
});
