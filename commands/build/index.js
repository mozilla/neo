'use strict';

const path = require('path');
const prodConfig = require('../../config/webpack.prod');
const webpack = require('webpack');

module.exports = (args, done) => {
  let config = args.options.config ?
    require(path.resolve(process.cwd(), args.options.config)) :
    prodConfig;

  webpack(config, (err, stats) => {
    if (!err) {
      console.log(stats.toString({ colors: true }));
    } else {
      console.error(err.stack || err);

      if (err.details) {
        console.error(err.details);
      }
    }

    done();
  });
};
