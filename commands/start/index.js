'use strict';

const devConfig = require('../../config/webpack.dev');
const DevServer = require('webpack-dev-server');
const path = require('path');
const webpack = require('webpack');

module.exports = (args, done) => {
  const port = args.options.port;
  const config = args.options.config ?
    require(path.resolve(process.cwd(), args.options.config)) :
    devConfig;

  const schema = config.devServer.https ? 'https' : 'http';
  const host = config.devServer.host || 'localhost';

  config.entry.unshift(
    `webpack-dev-server/client?${schema}://${host}:${port}`,
    'webpack/hot/dev-server'
  );

  const compiler = webpack(config);
  const server = new DevServer(compiler, config.devServer);

  process.on('SIGINT', done);
  server.listen(port, host, () => console.log(`Listening on ${schema}://${host}:${port}`));
};
