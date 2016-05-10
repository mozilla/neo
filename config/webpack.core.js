const { DefinePlugin } = require('webpack');
const exists = require('exists-file').sync;
const HtmlPlugin = require('html-webpack-plugin');
const merge = require('deepmerge');
const path = require('path');
const qs = require('qs');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');
const CWD_NODE_MODULES = path.join(CWD, 'node_modules');
const ENV = process.env.NODE_ENV;
const NODE_MODULES = path.join(__dirname, '../node_modules');
const PACKAGE = require(path.join(CWD, 'package.json'));
const SRC = path.join(CWD, 'src');
const TESTS = path.join(CWD, 'tests');
const USER_TEMPLATE = path.join(SRC, 'template.ejs');

let loader = name => `${name}?${qs.stringify(require(`.\/${name}`), {
  encode: false,
  arrayFormat: 'brackets'
})}`;

module.exports = {
  entry: [SRC],
  output: {
    path: BUILD,
    filename: 'bundle.js'
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new HtmlPlugin(merge({
      template: exists(USER_TEMPLATE) ?
        USER_TEMPLATE :
        path.join(__dirname, '../build/template.ejs'),
      hash: true,
      xhtml: true
    }, PACKAGE.config.html || {}))
  ],
  resolve: {
    root: [NODE_MODULES, CWD_NODE_MODULES],
    extensions: ['', '.js', '.jsx', '.json']
  },
  resolveLoader: {
    root: [NODE_MODULES, CWD_NODE_MODULES]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: [SRC],
        loader: loader('eslint')
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
        include: [SRC, TESTS],
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', loader('babel')]
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file'
      }
    ]
  }
};
