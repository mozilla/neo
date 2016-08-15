'use strict';

const path = require('path');
const Server = require('karma').Server;

module.exports = (args, done) => {
  new Server({
    configFile: args.options.config ?
      path.resolve(process.cwd(), args.options.config) :
      path.join(__dirname, 'karma.conf.js'),
    singleRun: !args.options.watch,
    autoWatch: args.options.watch
  }, done)
  .start();
};
