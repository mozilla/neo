const path = require('path');

module.exports = function() {
  let done = this.async();
  let name = '';
  let command = this.spawnCommand('bash', [
    '-c',
    'echo -n "$(npm config get init-author-name)"'
  ], { stdio: 'pipe' });

  command.stdout.on('data', data => name += data);
  command.on('close', () => {
    let questions = [
      {
        name: 'appTitle',
        message: 'What is the title of your app?',
        default: 'Project Name',
        store: true
      },
      {
        name: 'packageName',
        message: 'What is the name of your package (i.e. npm package name)?',
        default: path.basename(process.cwd()).replace(/\s/g, '-'),
        store: true
      },
      {
        name: 'author',
        message: 'Who is the author of this app?',
        default: name,
        store: true
      },
      {
        name: 'description',
        message: 'Description',
        default: 'A nifty React application',
        store: true
      },
      {
        name: 'port',
        message: 'Choose a port for development',
        default: 4000,
        store: true
      }
    ];

    this
      .prompt(questions)
      .then(answers => {
        this.data = answers;
        done();
      });
  });
};
