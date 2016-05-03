'use strict';

const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;

module.exports = new CommonsChunkPlugin({
  name: 'vendor',
  minChunks: Infinity,
  filename: 'vendor.bundle.js'
});
