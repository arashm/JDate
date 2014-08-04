var autoprefix = require('autoprefixer');
var crypto = require('crypto');

var cache = Object.create(null);

module.exports = function (options) {
  options = options || {};
  var auto = autoprefix;
  var browsers = options.browsers;
  if (Array.isArray(browsers)) browsers = browsers.join(', ');
  if (browsers) auto = autoprefix(browsers);
  else browsers = '';

  return function autoprefixer(file, done) {
    if (file.extension !== 'css') return done();
    file.read(function (err, string) {
      if (err) return done(err);
      var hash = browsers + calculate(string);
      var res;
      try {
        res = cache[hash] = cache[hash] || auto.process(string);
      } catch (err) {
        done(err);
        return;
      }

      file.string = res.css;
      done();
    })
  }
}

function calculate(string) {
  return crypto.createHash('md5')
    .update(string)
    .digest('hex');
}
