const fs = require('fs');
const helpers = require('yeoman-test');
const path = require('path');

helpers
  .run(path.join(__dirname, 'commands/init'))
  .withArguments(['init'])
  .withOptions({
    appTitle: 'Test App',
    packageName: 'test-app',
    author: 'Mozilla',
    description: 'Mozilla Test App',
    port: 5500
  })
  .toPromise()
  .then(dir => {
    const pkgPath = path.join(dir, 'package.json');
    const pkg = require(pkgPath);

    pkg.dependencies['mozilla-neo'] = `file:${__dirname}`;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    process.stdout.write(dir);
    process.exit(0);
  });
