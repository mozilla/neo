'use strict';

const deepmerge = require('deepmerge');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = (webpackConfig, extraConfig) => {
  webpackConfig = webpackConfig || {};
  extraConfig = extraConfig || {};

  delete webpackConfig.plugins;

  return deepmerge(extraConfig, {
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [ 'tests/*_test.js' ],
    preprocessors: { 'tests/*_test.js': ['webpack', 'sourcemap'] },
    reporters: ['mocha', 'coverage'],
    webpack: merge(webpackConfig, {
      plugins: [
        // https://github.com/cheeriojs/cheerio/issues/836#issuecomment-205158236
        new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, result => {
          if (/cheerio/.test(result.context)) {
            result.request = './package.json';
          }
        })
      ],
      devtool: 'inline-source-map',
      // https://github.com/airbnb/enzyme/issues/47#issuecomment-207498885
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      },
      module: {
        loaders: [
          { test: /\.json$/,
            loader: "json" 
          }
        ],
        postLoaders: [
          { test: /\.js$/,
            exclude: /(tests|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    }),
    phantomjsLauncher: {
      // Have PhantomJS exit if a ResourceError is encountered,
      // useful if karma exits without killing phantom
      exitOnResourceError: true
    },
    webpackMiddleware: {
      // Don't spam the console when running in karma
      noInfo: true
    },
    coverageReporter: {
      dir: '.coverage',
      reporters: [
        { type: 'html', subdir: 'report-html'},
        { type: 'lcov', subdir: 'report-lcov'},
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt'}
      ]
    }
  });

};
