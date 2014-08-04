
var semver = require('semver');
var fs = require('graceful-fs');
var write = require('write-to');
var decompress = require('decompress');
var debug = require('debug')('component-downloader');

var Downloader = require('./downloader');

/**
 * Download the entire repository.
 *
 * @param {Object} remote
 * @param {String} repo
 * @param {String} ref
 * @return {Object} remote
 * @api private
 */

Downloader.prototype._byArchive = function* (remote, repo, ref) {
  var archive = remote.archive(repo, ref);
  var uri = remote.name + '//' + repo + '@' + ref;

  var format;
  var url;
  if (archive.tar && archive.tar.length) {
    format = 'tar.gz';
    url = archive.tar[0];
  } else if (archive.zip && archive.zip.length) {
    format = 'zip';
    url = archive.zip[0];
  } else {
    throw new Error('no valid tarballs for "' + uri + '"');
  }

  var folder = this.folder(repo, ref);
  var ball = folder + '.' + format;
  debug('downloading "%s"', ball);
  var res = yield* remote.request(url);
  if (res.statusCode !== 200) {
    res.destroy();
    throw new Error('Error downloading "' + uri + '". Got status code "' + res.statusCode + '"');
  }

  // don't allow half-written balls
  process.on('exit', onexit);
  yield write(res, ball);
  process.removeListener('exit', onexit);

  yield extract;
  yield fs.unlink.bind(null, ball);

  // this should already be retrieved in the resolver,
  // so it shouldn't be a big deal.
  var json = yield* remote.json(repo, ref);

  /*
  var component = join(folder, 'component.json');
  var json;
  try {
    json = yield fs.readFile.bind(null, component);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    throw new Error('No component.json for "' + uri + '"');
  }
  try {
    json = JSON.parse(json);
  } catch (err) {
    throw new Error('error parsing "' + uri + '"\'s component.json');
  }
  */

  var valid = semver.valid(ref);
  // overwrite the version in case it wasn't updated
  if (valid) json.version = valid;
  // add a repo property
  // to do: handle redirects
  if (!json.repo) json.repo = repo;

  this.removeRelative(json);

  if (this.hasGlobs(json)) yield* this.unglobFromFolder(json, folder);

  yield* this.save(json, folder);

  function onexit() {
    fs.unlinkSync(ball);
  }

  function extract(done) {
    var reader = fs.createReadStream(ball)
    .on('error', cb);

    debug('extracting "%s" into "%s"', ball, folder);

    var writer = reader.pipe(decompress({
      ext: '.' + format,
      path: folder,
      strip: 1,
    }))
    .on('error', cb)
    .on('close', cb);

    function cb(err) {
      reader.removeListener('error', cb);
      writer.removeListener('error', cb);
      writer.removeListener('close', cb);
      done(err);
    }
  }
}
