'use strict';

const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;

module.exports = new UglifyJsPlugin({
  compress: { warnings: false },
  output: { comments: false },
  sourceMap: false
});
