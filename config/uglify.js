const { UglifyJsPlugin } = require('webpack').optimize;

module.exports = new UglifyJsPlugin({
  compress: { warnings: false },
  output: { comments: false },
  sourceMap: false
});
