
var rimraf = require('rimraf');
var utils = require('component-consoler');
var debug = require('debug')('component-downloader');

var Downloader = require('./downloader');

Downloader.prototype.download = function* (remotes, repo, ref, archive) {
  if (!Array.isArray(remotes)) {
    archive = ref;
    ref = repo;
    repo = remotes;
    remotes = null;
  }

  repo = repo.toLowerCase();
  var folder = this.folder(repo, ref);
  if (yield* this.exists(folder)) return debug('"%s" exists, skipping downloading.', folder);

  var start = Date.now();

  var remote = yield* this.resolve(remotes, repo, ref);
  debug('resolved %s@%s to %s', repo, ref, remote.name);
  var json = yield* remote.json(repo, ref);

  if (typeof archive !== 'boolean') archive = this.archive;
  // use archives for components with globs,
  // but in repositories that don't support trees.
  // specifically, bitbucket.
  var hasGlobs = this.hasGlobs(json);
  if (!archive && !remote._tree && this.hasGlobs(json)) {
    debug('%s does not support git trees - downloading %s@%s via archive', remote.name, repo, ref);
    archive = true;
  }
  // if there are more than X files to download,
  // just download the archive
  var fileCount = this.fileCount(json);
  if (!archive && !hasGlobs && fileCount > this.maxFiles) {
    debug('%s@%s has %s files, will download via archive', repo, ref, fileCount);
    archive = true;
  }

  process.on('exit', onexit);
  try {
    if (archive) {
      yield* this._byArchive(remote, repo, ref);
    } else {
      yield* this._byFields(remote, repo, ref);
    }
  } catch (err) {
    // delete the folder on errors
    yield rimraf.bind(null, folder);
    throw err;
  }
  process.removeListener('exit', onexit);

  var elapsed = Date.now() - start;
  debug('installed %s@%s in %sms', repo, ref, elapsed);
  if (this.verbose) utils.log('installed', repo + '@' + ref + ' in ' + elapsed + 'ms');

  // delete folders on premature exits
  function onexit() {
    rimraf.sync(folder);
  }
}
