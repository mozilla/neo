'use strict';

const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const js = require('./config/js');
const json =  require('./config/json');
const pkg = require('./config/package');
const istanbul =  require('./config/istanbul');

module.exports = config => {
  delete webpackConfig.plugins;

  config.set({
    basePath: __dirname,
    browsers: [process.env.CI ? 'ChromeCI' : 'Chrome'],
    customLaunchers: {
      ChromeCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests/*_test.js'
    ],
    preprocessors: {
      'tests/*_test.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    webpack: merge(webpackConfig, {
      plugins: [pkg],
      devtool: 'inline-source-map',
      // https://github.com/airbnb/enzyme/issues/47#issuecomment-207498885
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      },
      module: {
        loaders: [js, json],
        postLoaders: [istanbul]
      }
    }),
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
