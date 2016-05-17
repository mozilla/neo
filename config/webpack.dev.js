const core = require('./webpack.core');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(core, {
  devtool: 'hidden-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/MoOx/eslint-loader#noerrorsplugin
    new webpack.NoErrorsPlugin()
  ],
  eslint: {
    rules: {
      'no-console': 0
    }
  },
  devServer: {
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    hot: true,
    progress: true,
    contentBase: path.join(process.cwd(), 'src')
  }
});
