module.exports = {
  woff: {
    test: /\.(woff|woff2)$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      mimetype: 'application/font-woff'
    }
  },
  other: {
    test: /\.(ttf|eot|svg)$/,
    loader: 'file-loader'
  }
};
