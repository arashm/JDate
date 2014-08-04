
var unglob = require('unglob');
var fs = require('graceful-fs');
var Remotes = require('remotes');
var resolve = require('path').resolve;
var join = require('path').join;
var debug = require('debug')('component-downloader');

// default fields
var FIELDS = [
  'styles',
  'scripts',
  'json',
  'templates',
  'images',
  'fonts',
  'files',
];

module.exports = Downloader;

function Downloader(options) {
  options = options || {};

  // download folder, defaulting to
  // process.cwd() + '/components'
  this.out = resolve(options.out || options.dir || 'components');

  // remote instance
  var remote = options.remote || options.remotes;
  if (remote) {
    this.remote = remote;
  } else {
    debug('no remote specified, defaulting to regular remote');
    this.remote = Remotes(Remotes.defaults);
  }

  // fields to download
  this.fields = options.fields || FIELDS;

  // # of files to download at a time.
  this.concurrency = options.concurrency || 1;

  // maximum number of files for downloading one by one
  this.maxFiles = options.maxFiles || 10;

  this.verbose = !!options.verbose;

  // download archives
  this.archive = !!options.archive;
}

/**
 * Return a repo/ref's folder
 *
 * @param {String} repo
 * @param {String} ref
 * @return {String} path
 * @api public
 */

Downloader.prototype.folder = function (repo, ref) {
  var frags = repo.toLowerCase().split('/');
  if (frags.length !== 2) throw new Error('invalid repo: ' + repo);
  return join(this.out, frags[0], frags[1], ref);
}

/**
 * Checks if an installation exists only if the `component.json` exists.
 *
 * @param {String} repo
 * @param {String} ref
 * @return {Boolean}
 * @api public
 */

Downloader.prototype.exists = function* (folder) {
  var filename = join(folder, 'component.json');
  try {
    yield fs.stat.bind(null, filename);
  } catch (err) {
    return false;
  }
  return true;
}

/**
 * Resolve a repo/ref to a remote.
 *
 * @param {Array} remote names
 * @param {String} repo
 * @param {String} ref
 * @return {Object} remote
 * @api public
 */

Downloader.prototype.resolve = function* (remotes, repo, ref) {
  var remote = yield* this.remote.resolve(remotes, repo, ref);
  if (!remote) throw new Error('no remote found for dependency "' + repo + '@' + ref + '".');
  return remote;
}

/**
 * Check if a component.json uses globs.
 * If it does, we need to unglob.
 *
 * @param {Object} json
 * @return {Boolean}
 * @api public
 */

Downloader.prototype.hasGlobs = function (json) {
  var fields = this.fields;
  for (var i = 0; i < fields.length; i++) {
    var paths = json[fields[i]];
    if (!paths || !paths.length) continue;
    for (var j = 0; j < paths.length; j++) {
      if (~paths[j].indexOf('*')) return true;
    }
  }
  return false;
}

/**
 * Number of files to download.
 *
 * @param {Object} json
 * @return {Boolean}
 * @api public
 */

Downloader.prototype.fileCount = function (json) {
  return this.fields.map(function (field) {
    return (json[field] || []).length;
  }).reduce(function (a, b) {
    return a + b;
  }, 0);
}

/**
 * Unglob a component.
 *
 * @param {Object} json
 * @param {String} repo
 * @param {String} ref
 * @return {Object} json
 * @api public
 */

Downloader.prototype.unglobFromList = function (json, files) {
  var fields = this.fields;
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var paths = json[field];
    if (!paths || !paths.length) continue;
    json[field] = unglob.list(paths, files);
  }
  return json;
}

/**
 * Unglob a component.
 *
 * @param {Object} json
 * @param {String} folder
 * @return {Object} json
 * @api public
 */

 Downloader.prototype.unglobFromFolder = function* (json, folder) {
  var fields = this.fields;
  var fns = [];
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var paths = json[field];
    if (!paths || !paths.length) continue;
    fns.push(unglobber(field, paths));
  }
  yield fns;
  return json;

  function* unglobber(field, paths) {
    json[field] = yield* unglob.directory(paths, folder);
  }
 }

/**
 * Remove leading / and ./'s in all the fields.
 *
 * @param {Object} json
 * @api public
 */

Downloader.prototype.removeRelative = function (json) {
  if (json.main) json.main = removeRelative(json.main);
  var fields = this.fields;
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var paths = json[field];
    if (!paths || !paths.length) continue;
    json[field] = paths.map(removeRelative);
  }
}

/**
 * Save the JSON file to a folder.
 *
 * @param {Object} json
 * @param {String} folder
 * @api public
 */

Downloader.prototype.save = function* (json, folder) {
  yield fs.writeFile.bind(null,
    join(folder, 'component.json'),
    JSON.stringify(json, null, 2));
}

function removeRelative(path) {
  return path.replace(/^(\/|\.\/)/, '');
}
