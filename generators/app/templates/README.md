# <%= data.appTitle %>
## <%= data.description %>

Tools used in this project:

- React, Redux, React Router
- Immutable
- Bootstrap 4
- Node.js v6
- ES2015 + modules, Babel + Stage 0
- ESLint
- Webpack
- Karma + mocha + chai + enzyme + Chrome

## Getting started

1. Clone this repository
2. Install dependencies: `npm install`
3. Make changes, usually contained within `src` directory

## Commands

`npm start`

> Run development instance of application on default port <%= data.port %> via
> `webpack-dev-server`, with hot reloading of code via react-hot-loader.

`npm run build`

> Build production-ready static files into a `build` directory.

`npm test`

> Run once all the tests for the project in the `test` directory, as well as
> generation of coverage reports in the `coverage` directory.

`npm run test:dev`

> Starts a Chrome instance that watches for code changes and continuously
> re-runs tests.

## Configuration

This project does not use any external Node.js building tools, e.g. Grunt, gulp,
instead relying on npm scripts. The build process is managed via `webpack` and
different webpack loaders. Webpack is used here because it also provides nice
development environment with hot code reloading. Configuration for development,
testing, and production can be found in:

- `.babelrc`: JS/ES code transpilation configuration
- `.eslintrc`: Static linting enforcement configuration
- `karma.{conf.js,.js}`: Testing and code coverage configuration
- `webpack.{config.js,.js}`: General building configuration, along with plugins in the `config` directory

## Testing

The karma test runner is used in combination with mocha and chai. It uses
webpack's configuration to apply Babel transforms, external testing
environments, and code coverage reports. All tests are location in the `test`
directory, and upon running `npm test` will generate code coverage reports in
the `coverage` directory.

## Linting

Code style within the `src/` directory is enforced using ESLint. This process is
run whenever webpack is invoked, i.e. when running the development server, when
building, or running tests.

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
