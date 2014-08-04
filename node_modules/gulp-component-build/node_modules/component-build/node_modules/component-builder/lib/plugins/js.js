
var syntaxError = require('syntax-error');

module.exports = function (options) {
  options = options || {};
  var parse = options.parse !== false;

  return function js(file, done) {
    if (file.extension !== 'js') return done();
    file.read(function (err, string) {
      if (err) return done(err);

      if (parse) {
        var err = syntaxError(string, file.filename);
        if (err) return done(new Error(err.toString()));
      }

      file.string = string;
      done();
    })
  }
}