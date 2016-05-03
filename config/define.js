'use strict';

const DefinePlugin = require('webpack').DefinePlugin;

module.exports = new DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  }
});
