
var compile = require('es6-module-jstransform');
var isES6 = require('is-module');
var crypto = require('crypto');

var cache = Object.create(null);

module.exports = function (options) {
  options = options || {};

  return function es6ModuleToCJS(file, done) {
    if (file.extension !== 'js') return done();
    file.read(function (err, string) {
      if (err) return done(err);
      if (!isES6(string)) return done();

      var hash = calculate(string);

      try {
        file.string =
        cache[hash] = cache[hash]
          || compile(string).code;
      } catch (err) {
        done(err);
        return
      }

      done();
    })
  }
}

function calculate(string) {
  return crypto.createHash('sha256')
    .update(string)
    .digest('hex');
}