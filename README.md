# Neo

Scaffold out a React-based front-end application

## Features

- React, Redux, React Router
- Webpack
- ESLint, Babel, ES2015 + modules, Stage 0 preset
- Tests and coverage with Karma, Mocha, Chai, Enzyme, and Chrome
- Node.js v6
- Bootstrap 4 and Sass
- Travis CI
- Immutable

## Sample App

To view a sample application which contains the initial output of Neo after
running `init`, check out [eliperelman/neo-example](https://github.com/eliperelman/neo-example).

## Installation

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

```bash
# Sample output
→ create package.json
→ create README.md
→ create LICENSE
→ create src/
→ create tests/
→ create .gitignore
→ create .travis.yml
→ create .eslintrc
→ create karma.conf.js
→ create webpack.config.js
```

#### Workflow

- Add code to `src/` and tests to `tests/`.
- Build and watch changes in `src/` with `npm start`.
- Lint and build the project with `npm run build`.
- Run tests with `npm test`.

## Contribute

- Issue Tracker: [https://github.com/taskcluster/neo/issues](https://github.com/taskcluster/neo/issues)
- Source Code: [https://github.com/taskcluster/neo](https://github.com/taskcluster/neo)
- Code of Conduct: [Adapted from Rust CoC](https://www.rust-lang.org/conduct.html)

## Support

If you are having issues, please let us know.
We have an IRC channel `#tc-frontend` on [Mozilla IRC](https://wiki.mozilla.org/IRC)


## License

This project is licensed under the [Mozilla Public License v2.0](https://github.com/taskcluster/neo/blob/master/LICENSE)
