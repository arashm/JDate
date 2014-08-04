
/**
 * Read the file as a string.
 * Note that if the file has already been read,
 * it won't do anything.
 * You should use this last.
 */

module.exports = function () {
  return function string(file, done) {
    if ('string' in file) return setImmediate(done);
    file.read(function (err, string) {
      if (err) return done(err);
      file.string = JSON.stringify(string);
      file.define = true;
      done();
    })
  }
}
