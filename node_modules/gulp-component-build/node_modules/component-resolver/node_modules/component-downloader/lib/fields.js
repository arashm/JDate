
/**
 * Downloads a component's files based only on
 * the `.fields. This is usually faster than
 * .archives when the component is small,
 * i.e. only a few files.
 */

var co = require('co');
var mkdirp = require('mkdirp');
var channel = require('chanel');
var write = require('write-to');
var join = require('path').join;
var debug = require('debug')('component-downloader');

var Downloader = require('./downloader');

/**
 * Download a component via fields.
 *
 * @param {Object} remote
 * @param {String} repo
 * @param {String} ref
 * @return {Object} remote
 * @api private
 */

Downloader.prototype._byFields = function* (remote, repo, ref) {
  var json = yield* remote.json(repo, ref);
  this.removeRelative(json);

  // unglob all the fields based on the git tree
  if (this.hasGlobs(json)) {
    var tree = yield* remote.tree(repo, ref);
    this.unglobFromList(json, tree.map(toPath));
  }
  // push all the files to `paths`
  var paths = [];
  this.fields.forEach(function (field) {
    paths = paths.concat(json[field] || []);
  });

  var folder = this.folder(repo, ref);
  yield mkdirp.bind(null, folder);
  var ch = channel({
    discard: true,
    concurrency: this.concurrency
  });
  paths.forEach(function (path) {
    ch.push(co(download(path)));
  });
  yield ch(true);

  yield* this.save(json, folder);

  function* download(path) {
    var url = encodeURI(remote.file(repo, ref, path)[0]);
    var destination = join(folder, path);
    debug('downloading "%s" to "%s"', url, destination);
    var res = yield* remote.request(url);
    if (res.statusCode !== 200) {
      res.destroy();
      throw new Error('Error downloading "' + remote.name + '//' + repo + '@' + ref + '". Got status code "' + res.statusCode + '"');
    }
    yield write(res, destination);
  }
}

function toPath(x) {
  return x.path;
}
