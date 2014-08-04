/**
 * This is specifically for the builder where the
 * dependencies have been resolved and you just want
 * to access the component.jsons locally.
 */

var semver = require('semver');
var fs = require('graceful-fs');
var join = require('path').join;
var resolve = require('path').resolve;
var debug = require('debug')('remotes:local');

var Remote = require('../remote')

module.exports = Local

Remote.extend(Local)

function Local(options) {
  if (!(this instanceof Local))
    return new Local(options)

  options = Object.create(options || {});

  this.out = resolve(options.out
    || options.dir
    || 'components')
  debug('checking local components at %s', this.out);

  Remote.call(this, options)
}

Local.prototype.name = 'local';

/**
 * Local resolution is a little different than other remotes.
 * In particular, if no `ref` is set,
 * we check for any version.
 *
 * @param {String} repo
 * @return {this}
 * @api public
 */

Local.prototype.resolve = function* (remotes, repo, ref) {
  debug('resolving local remote');
  if (typeof remotes === 'string') {
    ref = repo;
    repo = remotes;
  } else if (Array.isArray(remotes) && !~remotes.indexOf('local')) {
    // if the current remote is not in this list,
    // then it's obviously not valid.
    return;
  }

  var folders = yield* this.folders(repo);
  // none installed
  if (!folders || !folders.length) return;
  // no specific version we care about
  if (!ref) return this;
  // exact tag version
  if (~folders.indexOf(ref)) return this;
  // check for equal semantic versions
  if (semver.maxSatisfying(folders.filter(valid), ref)) return this;
}

/**
 * Get the currently downloaded versions of a repo.
 *
 * @param {String} repo
 * @return {Array} folders
 * @api public
 */

Local.prototype.folders = function* (repo) {
  try {
    var frags = repo.toLowerCase().split('/');
    // ignore malformed repos for now
    if (frags.length !== 2) return;
    var folder = join(this.out, frags[0], frags[1]);
    debug('checking folder: %s', folder);
    var folders = yield readdir(folder);
    debug('got folders: %s', folders.join(', '));
    return folders.filter(noLeadingDot);
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }
}

/**
 * Return the currently downloaded components' semantic versions.
 *
 * @param {String} repo
 * @return {Array} references
 * @api public
 */

Local.prototype._versions = function* (repo) {
  return yield* this.folders(repo);
}

/**
 * Return the existing component.json, if any.
 * @param {String} repo
 * @param {String} reference
 * @return {Object} component.json
 * @api public
 */

Local.prototype._json = function* (repo, ref) {
  var body;
  var filename = join(this.out, repo, ref, 'component.json');
  try {
    body = yield read(filename);
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }
  try {
    return JSON.parse(body);
  } catch (_err) {
    throw new Error('JSON parsing error with "' + filename + '"');
  }
}

/**
 * NOT RELEVANT WITH THIS REMOTE
 */

Local.prototype._tree = function* () {
  /* jshint noyield:true */
}


function valid(x) {
  return semver.valid(x, true);
}

function noLeadingDot(x) {
  return x[0] !== '.';
}

function readdir(root) {
  return function (done) {
    fs.readdir(root, done)
  }
}

function read(filename) {
  return function (done) {
    fs.readFile(filename, 'utf8', done)
  }
}
