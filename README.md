# Neo
## Scaffold out a React-based front-end application

### Install

```sh
npm install -g generator-mozilla-neo
```

### Features

- React, Redux, React Router
- Webpack
- ESLint, Babel, ES2015 + modules, Stage 0 preset
- Tests and coverage with Karma, Mocha, Chai, Enzyme, and Chrome
- Node.js v6
- Bootstrap 4 and Sass
- Travis CI
- Immutable

### Usage
> You need [Yeoman](http://yeoman.io/) to run this command.
> Install it with `npm install -g yo`

```
yo mozilla-neo

→ create package.json
→ create README.md
→ create LICENSE
→ create src/
→ create tests/
→ create .gitignore
→ create .travis.yml
→ create .eslintrc
→ create karma.conf.js
→ create karma.js
→ create webpack.js
→ create webpack.config.js
```

### Workflow

- Add code to `src/` and tests to `tests/`.
- Lint, build, and test a project with `npm run build`.
- Build and watch changes in `src/` with `npm start`.
- Run only tests with `npm test`.
