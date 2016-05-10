const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deepmerge = require('deepmerge');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const NODE_ENV = ({
  'build': 'production',
  'test': 'testing',
  'start': 'development'
})[process.env.npm_lifecycle_event];

module.exports = (dirname, htmlConfig = {}, extraConfig = {}) => {
  const PATHS = {
    src: path.join(dirname, 'src'),
    build: path.join(dirname, 'build')
  };

  let webpackConfig = {
    entry: [
      PATHS.src
    ],
    output: {
      path: PATHS.build,
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
      }),
      new HtmlWebpackPlugin(deepmerge({
        template: path.join(PATHS.src, 'template.ejs'),
        hash: true,
        xhtml: true
      }, htmlConfig)),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      })
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          include: /src/,
          loader: 'eslint'
        }
      ],
      loaders: [
        {
          test: /\.html$/,
          loader: 'file',
          query: {
            name: '[name].[ext]'
          }
        },
        {
          test: /\.(css|scss)$/,
          loaders: ['style', 'css', 'sass']
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        },
        {
          test: /\.(ttf|eot|svg)$/,
          loader: 'file-loader'
        }
      ]
    },
    eslint: {
      configFile: path.join(dirname, '.eslintrc'),
      rules: {
        'no-console': NODE_ENV === 'development' ? [0] : [2]
      }
    }
  };

  if (NODE_ENV === 'development') {
    webpackConfig = merge(webpackConfig, {
      devtool: 'hidden-source-map',
      devServer: {
        // Display only errors to reduce the amount of output.
        stats: 'errors-only',
        hot: true,
        progress: true,
        contentBase: PATHS.src
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // https://github.com/MoOx/eslint-loader#noerrorsplugin
        new webpack.NoErrorsPlugin()
      ]
    });
  } else if (NODE_ENV === 'production') {
    webpackConfig = merge(webpackConfig, {
      plugins: [
        new CleanWebpackPlugin([PATHS.build], { root: dirname }),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false },
          output: { comments: false },
          sourceMap: false
        })
      ]
    });
  }

  return merge(webpackConfig, extraConfig);
};
