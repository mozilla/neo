const karmaConfig = require('./karma');
const webpackConfig = require('./webpack.config');

module.exports = config => {
  let customConfig = {};

  config.set(karmaConfig(webpackConfig, customConfig));
};
