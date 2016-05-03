'use strict';

const merge = require('webpack-merge');
const js = require('./js');
const json =  require('./json');
const pkg = require('./package');
const istanbul =  require('./istanbul');

module.exports = (webpackConfig, rootpath) => {
  delete webpackConfig.plugins;

  return {
    basePath: rootpath,
    browsers: ['PhantomJS'],
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
  };
};
