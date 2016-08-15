const core = require('./webpack.core');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

const dashboard = new Dashboard();

module.exports = merge(core, {
  devtool: 'hidden-source-map',
  plugins: [
    new DashboardPlugin(dashboard.setData),
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
    configFile: path.join(__dirname, 'eslint.dev.js')
  },
  devServer: {
    contentBase: path.join(process.cwd(), 'src'),
    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,
    hot: true,
    progress: true,
    quiet: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only'
  }
});
