'use strict';

const DefinePlugin = require('webpack').DefinePlugin;
const exists = require('exists-file').sync;
const HtmlPlugin = require('html-webpack-plugin');
const merge = require('deepmerge');
const path = require('path');
const qs = require('qs');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');
const CWD_NODE_MODULES = path.join(CWD, 'node_modules');
const NODE_MODULES = path.join(__dirname, '../node_modules');
const PACKAGE = require(path.join(CWD, 'package.json'));
const SRC_FILE = path.join(CWD, PACKAGE.config.entry);
const SRC = path.dirname(SRC_FILE);
const TESTS = path.join(CWD, 'tests');
const USER_TEMPLATE = path.join(SRC, 'template.ejs');
const ENV = Object
  .keys(process.env)
  .filter(key => key.toUpperCase().startsWith('NEO_'))
  .reduce((env, key) => {
    env[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return env;
  }, {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  });

const loader = name => `${name}?${qs.stringify(require(`.\/${name}`), {
  encode: false,
  arrayFormat: 'brackets'
})}`;

module.exports = {
  entry: ['babel-polyfill', SRC_FILE],
  output: {
    path: BUILD,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new DefinePlugin(ENV),
    new HtmlPlugin(merge({
      template: exists(USER_TEMPLATE) ?
        USER_TEMPLATE :
        path.join(__dirname, '../src/template.ejs'),
      hash: true,
      xhtml: true
    }, PACKAGE.config.html || {}))
  ],
  resolve: {
    root: [SRC, NODE_MODULES, CWD_NODE_MODULES],
    extensions: ['', '.js', '.jsx', '.json']
  },
  resolveLoader: {
    root: [NODE_MODULES, CWD_NODE_MODULES]
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.core.js'),
    useEslintrc: false
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: [SRC],
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
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        include: [SRC, TESTS],
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', loader('babel')]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: '10000',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'svg-url',
        query: {
          limit: '10000',
          mimetype: 'application/svg+xml'
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url',
        query: {
          limit: 8192
        }
      },
      {
        test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url'
      }
    ]
  }
};
