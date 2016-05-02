const { NormalModuleReplacementPlugin } = require('webpack');

// https://github.com/cheeriojs/cheerio/issues/836#issuecomment-205158236
module.exports = new NormalModuleReplacementPlugin(/^\.\/package$/, result => {
  if (/cheerio/.test(result.context)) {
    result.request = './package.json';
  }
});
