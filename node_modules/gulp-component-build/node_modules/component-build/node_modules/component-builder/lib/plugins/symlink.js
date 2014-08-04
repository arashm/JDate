var dirname = require('path').dirname;
var join = require('path').join;
var mkdirp = require('mkdirp');
var fs = require('graceful-fs');

var utils = require('../utils');

module.exports = function () {
  return function* symlink(file) {
    yield* utils.exists(file.filename);
    var out = join(this.destination, utils.rewriteUrl(file.branch), file.path);
    try {
      var link = yield fs.readlink.bind(null, out);
      // already linked
      if (link === out) return;
    } catch (err) {}
    yield mkdirp.bind(null, dirname(out));
    // in case it was copied or something
    yield* utils.unlink(out);
    yield fs.symlink.bind(null, file.filename, out);
  }
}