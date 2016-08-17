'use strict';

module.exports = function() {
  this.installDependencies({
    bower: false,
    callback: () => {
      this.log('Pruning unused npm packages.\n');
      this.spawnCommandSync('npm', ['prune']);
      this.log('Done! You may wish to run `npm init` or make manual changes to your package.json.');
    }
  });
};
