'use strict';

const testConfig = require('./webpack.test');

const TESTS = 'tests/**/*_test.js';

module.exports = {
  basePath: process.cwd(),
  browsers: [process.env.CI ? 'ChromeCI' : 'Chrome'],
  customLaunchers: {
    ChromeCI: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  },
  frameworks: ['mocha'],
  files: [TESTS],
  preprocessors: {
    [TESTS]: ['webpack', 'sourcemap']
  },
  reporters: ['mocha', 'coverage'],
  webpack: testConfig,
  webpackMiddleware: { noInfo: true },
  coverageReporter: {
    dir: '.coverage',
    reporters: [
      { type: 'html', subdir: 'report-html' },
      { type: 'lcov', subdir: 'report-lcov' }
    ]
  }
};
