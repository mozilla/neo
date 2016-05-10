const path = require('path');
const { Server } = require('karma');

module.exports = (args) => {
  new Server({
    configFile: args.options.config ?
      path.resolve(process.cwd(), args.options.config) :
      path.join(__dirname, 'karma.conf.js'),
    singleRun: true,
    autoWatch: false
  }, () => process.exit(0))
  .start();
};
