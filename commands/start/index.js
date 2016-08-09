const devConfig = require('../../config/webpack.dev');
const DevServer = require('webpack-dev-server');
const path = require('path');
const webpack = require('webpack');

module.exports = (args, done) => {
  let port = args.options.port;
  let config = args.options.config ?
    require(path.resolve(process.cwd(), args.options.config)) :
    devConfig;

  let schema = 'http';
  if (config.devServer.https === true) {
      schema = 'https';
  }

  let host = config.devServer.host || 'localhost';

  config.entry.unshift(
    `webpack-dev-server/client?${schema}://${host}:${port}`,
    'webpack/hot/dev-server'
  );

  let compiler = webpack(config);
  let server = new DevServer(compiler, config.devServer);

  process.on('SIGINT', done);
  server.listen(port, host, () => console.log(`Listening on ${schema}://${host}:${port}`));
};
