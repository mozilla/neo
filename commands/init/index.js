'use strict';

const Base = require('yeoman-generator').Base;
const initializing = require('./generator/initializing');
const install = require('./generator/install');
const prompting = require('./generator/prompting');
const writing = require('./generator/writing');

module.exports = Base.extend({
  initializing,
  prompting,
  writing,
  install
});
