module.exports = {
  test: /\.js$/,
  exclude: /(tests|node_modules)/,
  loader: 'istanbul-instrumenter'
};
