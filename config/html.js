module.exports = {
  test: /\.html$/,
  loader: 'file',
  query: {
    name: '[name].[ext]'
  }
};
