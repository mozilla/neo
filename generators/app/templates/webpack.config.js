const webpackConfig = require('./webpack');

let htmlConfig = {
  title: '<%= data.appTitle %>',
  description: '<%= data.description %>',
  author: '<%= data.author %>'
};

let customConfig = {};

module.exports = webpackConfig(__dirname, htmlConfig, customConfig);
