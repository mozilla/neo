// const path = require('path');

module.exports = {
  test: /\.jsx?$/,
  // include: path.join(__dirname, '..', 'src'),
  exclude: /(node_modules|bower_components|build)/,
  loaders: ['babel']
};
