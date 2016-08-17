'use strict';

module.exports = {
  root: true,
  failOnWarning: false,
  failOnError: true,
  plugins: [
    'react',
    'mocha'
  ],
  settings: {
    react: {
      pragma: 'React',
      version: '15.0'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      impliedStrict: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'react/prop-types': [0]
  },
  globals: {
    process: true
  }
};
