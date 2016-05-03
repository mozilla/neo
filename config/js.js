module.exports = {
  test: /\.jsx?$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel',
  query: {
    presets: [
      'es2015',
      'stage-0',
      'react'
    ]
  }
};
