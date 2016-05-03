'use strict';

const bootstrap = require('./bootstrap');
const chunk = require('./chunk');
const clean = require('./clean');
const css = require('./css');
const define = require('./define');
const html = require('./html');
const js = require('./js');
const lint = require('./lint');
const path = require('path');
const uglify = require('./uglify');

module.exports = rootpath => {
  const SRC = path.resolve(rootpath, 'src');
  const BUILD = path.resolve(rootpath, 'build');
  const IS_PROD = process.env.npm_lifecycle_event === 'build';

  let plugins = [chunk, define];

  if (IS_PROD) {
    plugins.push(clean)
    plugins.push(uglify)
  }

  return {
    devtool: IS_PROD ? 'cheap-eval-source-map' : 'hidden-source-map',
    entry: [
      path.join(SRC, 'index')
    ],
    output: {
      path: BUILD,
      filename: 'bundle.js'
    },
    module: {
      preLoaders: [lint.loader],
      loaders: [html, css, js, bootstrap.woff, bootstrap.other]
    },
    eslint: lint.config,
    plugins,
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    devServer: {
      contentBase: SRC,
      stats: 'errors-only'
    }
  };
};
