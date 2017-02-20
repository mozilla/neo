### DEPRECATED!

Please see Neutrino for an alternative!

https://neutrino.js.org

---



<p align="center">
  <img src="neo.png" height="96" />
</p>

<p align="center">Create and build React web applications with zero initial configuration and minimal fuss.</p>

---

Neo bakes in the best-of-the-bunch configurations and setup to make developing React-based sites quicker and easier.
It is not just another React boilerplate, rather Neo gives you a single development dependency enabling you to develop,
test, and build which let's you hit the ground running.

[Neo: Introduction on Medium](https://blog.eliperelman.com/neo-8bf3d7325f7)

---

## Features

- React, Redux, React Router
- Webpack
- ESLint, Babel, ES2015 + modules, Stage 0 preset
- Tests and coverage with Karma, Mocha, Chai, and Enzyme
- Immutable
- Bootstrap 4 and Sass
- Travis CI

## Requirements

- Node.js v4+ and npm

## Sample App

To view a sample application which contains the initial output of Neo after
running `init`, check out [eliperelman/neo-example](https://github.com/eliperelman/neo-example).

## Initialize empty project

#### Global

```bash
npm install -g mozilla-neo
mkdir <project-name> && cd <project-name>
neo init # and follow the prompts
```

#### Local

```bash
mkdir -p <project-name>/node_modules && cd <project-name>
npm install mozilla-neo
node_modules/.bin/neo init # and follow the prompts
```

##### Sample output

```bash
→ create package.json
→ create src/
→ create tests/
→ create .gitignore
→ create .travis.yml
→ create LICENSE
→ create README.md
```

## Install in existing project

```bash
npm install --save-dev mozilla-neo
```

Make changes to configuration by following the [scaffold init guide](https://github.com/mozilla/neo/tree/master/commands/init/templates#configuration).

## Workflow

- Add code to `src/` and tests to `tests/`.
- Build and watch changes in `src/` with `npm start`.
- Lint and build the project with `npm run build`.
- Run tests with `npm test`.

## Support Flow checker

[Flow](https://flowtype.org/) is an sophisticated JavaScript static type checker made by Facebook.
It works by adding type annotation to plain JavaScript code and is easy to integrate:

1. Run: `npm install --save-dev flow-bin flow-status-webpack-plugin`
1. Initialize flow: `node_modules/.bin/flow init`
1. Edit newly created `.flowconfig` file:

        [ignore]
        .*/node_modules/.*

        [include]

        [libs]

        [options]

1. create `dev.config.js` (in the project root - just next to `package.json`)

        const dev = require('mozilla-neo/config/webpack.dev');
        const FlowStatusPlugin = require('flow-status-webpack-plugin/index');

        dev.plugins.push(new FlowStatusPlugin({
        	binaryPath: 'node_modules/.bin/flow',
        	onError: console.log,
        	onSuccess: console.log  // remove this to not display success messages
        }));

        module.exports = dev

1. Epdate `package.json` by add `--config dev.config.js` argument to neo start:

        "scripts": {
          "build": "neo build",
          "start": "neo start --port 4000 --config dev.config.js",
          "test": "neo test"
        },


## Changes

### v2.7.0

- Support deeply-nested test files in `tests/`

### v2.6.0

- Support importing modules relative to `src/`
- Use `svg-url-loader` for SVGs

### v2.3.0

- Added support for building projects using Node.js v4+

### v2.2.0

- Added support for JSON loading

### v2.1.0

- Removed Elm from being "baked in"
- Added support for web workers via worker-loader
- Updated a few dependencies

### v2.0.0

- Removed `config/eslint.js` in favor of `config/eslint.core.js` and `config/eslint.dev.js`
- Moved `src/app.js` into project for easy customization and removal

## Contribute

- Issue Tracker: [https://github.com/mozilla/neo/issues](https://github.com/mozilla/neo/issues)
- Source Code: [https://github.com/mozilla/neo](https://github.com/mozilla/neo)
- Code of Conduct: [Adapted from Rust CoC](https://www.rust-lang.org/conduct.html)

Note: There is currently a [bug in npm](https://github.com/npm/npm/issues/13385) from being able to run the `npm test`
command in this repo in development. As a workaround, make sure you are using a npm 3.8.9 or less.

## Support

If you are having issues, please let us know.

Join our Slack community at [https://neo-slack.herokuapp.com/](https://neo-slack.herokuapp.com/).

We also have an IRC channel `#neo` on [Mozilla IRC](https://wiki.mozilla.org/IRC).


## License

This project is licensed under the [Mozilla Public License v2.0](https://github.com/mozilla/neo/blob/master/LICENSE)
