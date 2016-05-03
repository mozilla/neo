'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');

module.exports = new CleanWebpackPlugin([build], { root });
