const deepmerge = require('deepmerge');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = (webpackConfig = {}, extraConfig = {}) => {
  delete webpackConfig.plugins;

  return deepmerge(extraConfig, {
    browsers: [process.env.CI ? 'ChromeCI' : 'Chrome'],
    customLaunchers: {
      ChromeCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true,
    frameworks: ['mocha'],
    files: ['tests/*_test.js'],
    preprocessors: {
      'tests/*_test.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    webpack: merge(webpackConfig, {
      devtool: 'inline-source-map',
      // https://github.com/airbnb/enzyme/issues/47#issuecomment-207498885
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      },
      module: {
        loaders: [
          {
            test: /\.json$/,
            loader: 'json'
          }
        ],
        postLoaders: [
          {
            test: /\.js$/,
            exclude: /(tests|node_modules)/,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    }),
    webpackMiddleware: {
      // Don't spam the console when running in karma
      noInfo: true
    },
    coverageReporter: {
      dir: '.coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    }
  });
};
