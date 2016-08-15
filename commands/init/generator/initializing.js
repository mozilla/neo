'use strict';

module.exports = function() {
  this.spawnCommandSync('git', ['init', '--quiet']);
};
