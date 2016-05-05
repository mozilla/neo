'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const NODE_ENV = {
  'build': 'production',
  'test': 'testing',
  'start': 'development'
}[process.env.npm_lifecycle_event];

module.exports = (dirname, htmlConfig, extraConfig) => {
  htmlConfig = htmlConfig || {};
  extraConfig = extraConfig || {};

  const PATHS = {
    app: path.join(dirname, 'src'),
    build: path.join(dirname, 'build')
  };

  let webpackConfig = {
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: '' +
          '<!doctype html>\n' +
          '<html>\n' +
          '  <head>\n' +
          '    <meta charset="utf-8">\n' +
          '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
          '    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n' +
          '    <meta name="description" content="' + (htmlConfig.description || '') + '">\n' +
          '    <meta name="author" content="' + (htmlConfig.author || '') + '">\n' +
          '    <title>' + (htmlConfig.title || '') + '</title>\n' +
          '    ' + (htmlConfig.head || '') + '\n' +
          '  </head>\n' +
          '  <body>\n' +
          '    <div id="app"></div>\n' +
          '    ' + (htmlConfig.body || '') +
          '  </body>\n' +
          '</html>'
      }),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(NODE_ENV)})
    ],
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      preLoaders: [
        { test: /\.jsx?$/,
          exclude: /(node_modules|bower_components|build)/,
          loader: 'eslint',
        }
      ],
      loaders: [
        { test: /\.html$/,
          loader: 'file',
          query: {
            name: '[name].[ext]'
          }
        },
        { test: /\.css$/,
          loaders: ['style', 'css', 'sass']
        },
        { test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: [
              'es2015',
              'stage-0',
              'react'
            ]
          }
        },
        { test: /\.(woff|woff2)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        },
        { test: /\.(ttf|eot|svg)$/,
          loader: 'file-loader'
        }
      ]
    },
    eslint: {
      failOnWarning: false,
      failOnError: true,
      plugins: [
        "react",
        "mocha"
      ],
      extends: [
        "eslint:recommended",
        "plugin:react/recommended"
      ],
      env: {
        browser: true
      },
      parserOptions: {
        ecmaVersion: 7,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
          impliedStrict: true,
          experimentalObjectRestSpread: true
        }
      },
      rules: {
        "react/prop-types": [0]
      }
    }
  };

  if (NODE_ENV === 'development') {
    webpackConfig = merge(webpackConfig, {
      devtool: 'hidden-source-map',
      devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: PATHS.app,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only'
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(), // because of https://github.com/MoOx/eslint-loader#noerrorsplugin
      ]
    });

  } else if (NODE_ENV === 'production') {
    webpackConfig = merge(webpackConfig, {
      plugins: [
        new CleanWebpackPlugin([PATHS.build]),
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
