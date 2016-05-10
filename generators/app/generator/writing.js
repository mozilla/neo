module.exports = function() {
  let copyDirs = ['src', 'tests'];
  let copyFiles = [
    '.babelrc',
    '.eslintrc',
    '.gitignore',
    '.travis.yml',
    'karma.conf.js',
    'karma.js',
    'LICENSE',
    'webpack.js'
  ];
  let copyTemplates = [
    'package.json',
    'README.md',
    'webpack.config.js',
    'src/index.js'
  ];
  
  copyDirs.forEach(dir => {
    this.fs.copy(this.templatePath(`${dir}/**/*`), this.destinationPath(dir));
  });
  
  copyFiles.forEach(file => {
    this.fs.copy(this.templatePath(file), this.destinationPath(file));
  });
  
  copyTemplates.forEach(template => {
    this.fs.copyTpl(
      this.templatePath(template),
      this.destinationPath(template),
      { data: this.data }
    );
  });
};
