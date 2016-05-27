const devConfig = require('../../config/webpack.dev');
const DevServer = require('webpack-dev-server');
const path = require('path');
const webpack = require('webpack');

module.exports = (args, done) => {
  let port = args.options.port;
  let config = args.options.config ?
    require(path.resolve(process.cwd(), args.options.config)) :
    devConfig;

  config.entry.unshift(
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/dev-server'
  );

  let compiler = webpack(config);
  let server = new DevServer(compiler, config.devServer);

  process.on('SIGINT', done);
  server.listen(port, 'localhost', () => console.log(`Listening on http://localhost:${port}`));
};
