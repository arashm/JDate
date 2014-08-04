
module.exports = function () {
  return function json(file, done) {
    if (file.extension !== 'json') return done();
    file.read(function (err, string) {
      if (err) return done(err);
      try {
        JSON.parse(string);
      } catch (err) {
        done(new Error('"' + file.filename + '" is invalid JSON'));
        return;
      }
      file.string = string;
      file.define = true;
      done();
    })
  }
}
