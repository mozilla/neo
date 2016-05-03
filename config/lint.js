module.exports = {
  loader: {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|build)/,
    loader: 'eslint',
  },
  config: {
    failOnWarning: false,
    failOnError: true,
    plugins: [
      "react",
      "mocha"
    ],
    extends: [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    env: {
      browser: true
    },
    parserOptions: {
      ecmaVersion: 7,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
        impliedStrict: true,
        experimentalObjectRestSpread: true
      }
    },
    rules: {
      "react/prop-types": [0]
    }
  }
};
