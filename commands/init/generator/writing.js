module.exports = function() {
  let copyDirs = ['src', 'tests'];
  let copyFiles = [
    '.gitignore',
    '.travis.yml',
    'LICENSE'
  ];
  let copyTemplates = [
    'package.json',
    'README.md',
    'src/index.js'
  ];

  copyDirs.forEach(dir => {
    this.fs.copy(this.templatePath(`${dir}/**/*`), this.destinationPath(dir));
  });

  copyFiles.forEach(file => {
    this.fs.copy(
      this.templatePath(file.startsWith('.') ? file.substr(1) : file),
      this.destinationPath(file)
    );
  });

  copyTemplates.forEach(template => {
    this.fs.copyTpl(
      this.templatePath(template),
      this.destinationPath(template),
      { data: this.data }
    );
  });
};
