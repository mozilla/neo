const { DefinePlugin } = require('webpack');

module.exports = new DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  }
});
