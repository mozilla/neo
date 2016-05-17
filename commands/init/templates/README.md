# <%= data.appTitle %>

<%= data.description %>

## Features

- React, Redux, React Router
- Immutable
- Bootstrap 4
- Node.js v6
- ES2015 + modules, Babel + Stage 0
- ESLint
- Webpack
- Karma + Mocha + Chai + Enzyme + Chrome

## Installation

1. Install dependencies: `npm install`
2. Make changes, usually contained within `src` directory
3. Build the project to `build/` using `npm run build`

## Commands

`npm start`

> Run development instance of application on port <%= data.port %> via a
> webpack development server with hot reloading of code via react-hot-loader.

`npm run build`

> Build production-ready static files into a `build` directory.

`npm test`

> Run all the tests for the project in the `tests` directory, as well as
> generation of coverage reports in the `.coverage` directory.

## Configuration

This project does not use any external Node.js building tools, e.g. Grunt, gulp,
instead relying on npm scripts. The build process is managed via Neo's webpack
and different webpack loaders. Webpack is used here because it provides a nice
development environment with hot code reloading. Configuration for development,
testing, and production can be extended as follows.

#### Building

Neo uses Webpack and Webpack Dev Server as the build engine to transpile code,
run tests, and lint code style. If you wish to make changes or override these
settings, you can create your own webpack configuration file in the project and
pass this configuration file to the `npm scripts`. Neo exposes a number of
configurations to manipulate the build environments: `webpack.core`,
`webpack.dev`, `webpack.prod`, and `webpack.test`.

As an example, if you wanted to change the behavior of `npm start`, you could
create a `webpack.start.js` file in the root of the project:

```js
// webpack.start.js
let devConfig = require('mozilla-neo/config/webpack.dev');

devConfig.devtool = 'cheap-inline-source-map';

module.exports = devConfig;
```

then modify the `npm start` script to use this custom configuration:

```json
// package.json
{
  "scripts": {
    "start": "neo start --port <%= data.port %> --config webpack.start.js"
  }
}
```

For reference:

- [`config/webpack.core`](https://github.com/taskcluster/neo/blob/master/config/webpack.core.js):
The webpack config base used by all other configurations
- [`config/webpack.dev`](https://github.com/taskcluster/neo/blob/master/config/webpack.dev.js):
The webpack config used in the development process `npm start`
- [`config/webpack.test`](https://github.com/taskcluster/neo/blob/master/config/webpack.test.js):
The webpack config used when running `npm test`. This config removes any plugins defined in `webpack.core`.
- [`config/webpack.prod`](https://github.com/taskcluster/neo/blob/master/config/webpack.prod.js):
The webpack config used when running `npm run build`

Additional configurations to modify or utilize:

- [`config/babel`](https://github.com/taskcluster/neo/blob/master/config/babel.js): The Babel presets used internally by default
- [`config/eslint`](https://github.com/taskcluster/neo/blob/master/config/eslint.js): ESLint default plugins, presets, and rules
- [`config/karma`](https://github.com/taskcluster/neo/blob/master/config/karma.js): Karma testing and coverage settings

##### HTML template

Neo uses its own [HTML template](https://github.com/taskcluster/neo/blob/master/src/template.ejs)
to generate the initial markup for the static page it will render. To specify a
custom template, create a `template.ejs` file in the `src` directory and Neo
will pick it up automatically. In your `package.json` there is a `config.html`
section where you can specify custom variables for your template. These values
can be accessed via `htmlWebpackPlugin.options.custom_variable_name`. See the
default [HTML template](https://github.com/taskcluster/neo/blob/master/src/template.ejs)
for an demonstration of this usage.

#### Transpiling

Neo uses Babel to transpile unsupported JavaScript syntax to a supported syntax.
By default Neo uses the following Babel presets to render syntax:

- [ES2015](https://babeljs.io/docs/plugins/preset-es2015/)
- [Stage 0](https://babeljs.io/docs/plugins/preset-stage-0/)
- [React](https://babeljs.io/docs/plugins/preset-react/)

If you would like to supply your own Babel presets, plugins, or configuration,
simply add a `.babelrc` file to the root of this project and Neo will pick it up
automatically. [How to use the babelrc](https://babeljs.io/docs/usage/babelrc/).

You can also make manual changes to Neo's Babel configuration by requiring,
modifying, and passing that directly to your [custom webpack configuration](#Building).

```js
let babelConfig = require('mozilla-neo/config/babel');

// modify babelConfig

module.exports = {
  loaders: [
    {
      loader: 'babel',
      query: babelConfig
    }
  ]
};
```

#### Linting

Neo uses ESLint to enforce code style, and comes pre-configured with several
plugins and rules to get up and running quickly. Code style within the `src/`
directory is enforced using ESLint. This process is run whenever webpack is
invoked, i.e. when running the development server, when building, or running
tests. Using your own rules can be done either by modifying the existing
configuration or providing a completely custom configuration. You may choose to
modify these values directly from the webpack configuration, or a custom
[ESLint Configuration file](http://eslint.org/docs/user-guide/configuring#configuration-file-formats).

To use a custom ESLint configuration file, create it in the root of your
project, then specify this to webpack in your [custom webpack configuration](#Building).

As an example, let's say you would like to change the ESLint configuration for
the `npm run build` script:

```json
// .eslintrc.json
{
  "rules": {
    "semi": [2, "never"]
  }
}
```

```js
// webpack.custom.js
let build = require('mozilla-neo/config/webpack.prod');
let path = require('path');

build.eslint = {
  configFile: path.join(process.cwd(), '.eslintrc.json')
};

module.exports = build;
```

```json
// package.json
{
  "scripts": {
    "build": "neo build --config webpack.custom.js"
  }
}
```

#### Testing

Neo uses the Karma test runner, along with Mocha and Chai to run tests and
output code coverage. Test build configuration can be done by either modifying
the Neo's presets or providing your own, and sending this to the Karma
configurator. Karma has two configuration files: a `karma` file which configures
the Karma runner and its server, and a `webpack.test` file which configures how
the build is executed when running tests.

As an example, let's say you would like to change the directory for coverage
reports from `.coverage` to `coverage` in a custom `karma.custom.js`:

```js
// karma.custom.js
let config = require('mozilla-neo/config/karma');

config.coverageReporter.dir = 'coverage';

module.exports = (karma) => karma.set(config);
```

```json
// package.json
{
  "scripts": {
    "test": "neo test --config karma.custom.js"
  }
}
```

## References

- [Webpack](https://webpack.github.io/)
- [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html)
- [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [Karma](https://karma-runner.github.io)
- [Enzyme](http://airbnb.io/enzyme/)
- [Mocha](http://mochajs.org/)
- [Chai](http://chaijs.com/)
- [ESLint](http://eslint.org/)
- [Babel](http://babeljs.io/)
