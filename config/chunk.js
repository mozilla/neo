const { CommonsChunkPlugin } = require('webpack').optimize;

module.exports = new CommonsChunkPlugin({
  name: 'vendor',
  minChunks: Infinity,
  filename: 'vendor.bundle.js'
});
