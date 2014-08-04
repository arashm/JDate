var debug = require('debug')('remotes:github');

var Remote = require('../remote')

var GITHUB_USERNAME = process.env.GITHUB_USERNAME
var GITHUB_PASSWORD = process.env.GITHUB_PASSWORD

var API_COUNTER = 0; // keeps track of API requests and output via debug at process exit

module.exports = GitHub

Remote.extend(GitHub)

function GitHub(options) {
  if (!(this instanceof GitHub))
    return new GitHub(options)

  options = Object.create(options || {});

  // set the github API auth via environment
  // otherwise, use netrc or something.
  if (!options.auth && GITHUB_USERNAME && GITHUB_PASSWORD)
    options.auth = GITHUB_USERNAME + ':' + GITHUB_PASSWORD

  Remote.call(this, options)
}

GitHub.prototype.name = 'github'

/**
 * DOES NOT SOLVE REDIRECTS!
 *
 * @param {String} repo
 * @return {Array} references
 * @api public
 */

GitHub.prototype._versions = function* (repo) {
  var uri = 'https://api.github.com/repos/' + repo + '/tags';
  debug('GET "%s"', uri);
  API_COUNTER++;
  var res = yield* this.request(uri, true);
  // this shouldn't happen as the remote should be resolved first
  // if it does happen, it could be that the repo was moved and .json() redirected.
  // we need a good UI to fix this
  if (res.statusCode === 404) {
    var err = new Error('failed to get ' + repo + '\'s tags. please check that this repository still exists!');
    err.res = res;
    err.remote = 'github';
    throw err;
  }
  if (res.statusCode === 403) return errorRateLimitExceeded(res);
  if (res.statusCode === 401) return errorBadCredentials(res);
  if (res.statusCode !== 200) {
    var err = new Error('failed to get ' + repo + '\'s tags');
    err.res = res;
    err.remote = 'github';
    throw err;
  }
  checkRateLimitRemaining(res);

  return res.body.map(name);
}

function name(x) {
  return x.name
}

/**
 * Get a component and references's component.json.
 * Since GitHub has raw.github.com as well as raw.githubusercontent.com,
 * we try both URLs, and ignore any errors that might be returned.
 * This includes 404s as some repos are available on one endpoint,
 * but not the other.
 *
 * @param {String} repo
 * @param {String} reference
 * @return {Object} component.json
 * @api public
 */

GitHub.prototype._json = function* (repo, ref) {
  var retries = this.retries;
  var uris;
  var uri;
  var res;
  for (var i = 0; i <= retries; i++) {
    uris = this.file(repo, ref, 'component.json');
    for (var j = 0; j < uris.length; j++) {
      uri = uris[j];
      debug('GET "%s"', uri);
      try {
        res = yield* this.request(uri, true);
      } catch (err) {
        debug('error when GETing "%s": "%s', uri, err.message);
        continue;
      }
      if (res.statusCode !== 200) continue;
      return res.body;
    }
  }
}

/**
 * DOES NOT SOLVE REDIRECTS!
 *
 * @param {String} repo
 * @param {String} ref
 * @return {Array} objects
 * @api public
 */

GitHub.prototype._tree = function* (repo, ref) {
  var uri = 'https://api.github.com/repos/' + repo + '/git/trees/' + ref + '?recursive=1'
  debug('GET "%s"', uri);
  API_COUNTER++;
  var res = yield* this.request(uri, true)
  if (!res.body) return malformedJSON(uri, res);
  if (res.statusCode === 404) return
  if (res.statusCode === 403) return errorRateLimitExceeded(res);
  if (res.statusCode === 401) return errorBadCredentials(res);
  if (res.statusCode !== 200) {
    var err = new Error('failed to get ' + repo + '\'s git tree')
    err.res = res
    err.remote = 'github'
    throw err
  }
  checkRateLimitRemaining(res);

  return res.body.tree.filter(isBlob);
}

/**
 * Only return blobs.
 *
 * @param {Object} node
 * @return {Boolean}
 * @api private
 */

function isBlob(x) {
  return x.type === 'blob';
}

/**
 * Return URLs of download locations for a particular file.
 * The path must be UNIX-style paths.
 * Note that I have no idea what the different github endpoints are or their differences.
 *
 * @param {String} repo
 * @param {String} reference
 * @param {Object} object
 * @return {String} urls
 * @api public
 */

GitHub.prototype.file = function (repo, ref, path) {
  if (typeof path === 'object') path = path.path;
  var tail = repo + '/' + ref + '/' + path;
  return [
    'https://raw.githubusercontent.com/' + tail,
    'https://raw.github.com/' + tail,
  ]
}

/**
 * Return URLs of download locations for archives.
 * The path must be UNIX style paths.
 * The file format can be any.
 *
 * @param {String} repo
 * @param {String} reference
 * @return {Object} urls
 * @api public
 */

GitHub.prototype.archive = function (repo, ref) {
  // http://developer.github.com/v3/repos/contents/#get-archive-link
  var root = 'https://api.github.com/repos/' + repo;
  // ref is optional here - it will default to the default branch
  // which may or may not be master
  ref = ref ? '/' + ref : '';
  return {
    tar: [
      root + '/tarball' + ref,
    ],
    zip: [
      root + '/zipball' + ref,
    ]
  }
}

/**
 * Sometimes GitHub returns malformed JSON with 200.
 * I don't know why.
 *
 * @param {Object} response
 * @api private
 */

function malformedJSON(uri, res) {
  var err = new Error('github returned malformed JSON at URL: ' + uri);
  err.res = res;
  err.text = res.text;
  err.remote = 'github';
  throw err;
}

/**
 * Better error message when rate limit exceeded.
 *
 * @param {Object} response
 * @api private
 */

function errorRateLimitExceeded(res) {
  var err = new Error('Github rate limit exceeded. Supply credentials via auth option. See https://github.com/component/guide/blob/master/changelogs/1.0.0.md#required-authentication for more information.');
  err.res = res;
  err.remote = 'github';
  throw err;
}

/**
 * Warn when rate limit is low.
 *
 * @param {Object} response
 * @api private
 */

function checkRateLimitRemaining(res) {
  var remaining = parseInt(res.headers['x-ratelimit-remaining'], 10);
  if (remaining <= 50) {
    console.warn('github remote: only %d requests remaining.', remaining);
    console.warn('github remote: see https://github.com/component/guide/blob/master/changelogs/1.0.0.md#required-authentication for more information.');
  }
}

/**
 * Better error message when credentials are not supplied.
 *
 * @param {Object} response
 * @api private
 */

function errorBadCredentials(res) {
  var err = new Error('Invalid credentials - please see https://github.com/component/guide/blob/master/changelogs/1.0.0.md#required-authentication');
  err.res = res;
  err.remote = 'github';
  throw err;
}


/**
 * The API_COUNTER variable will be printed on process exit, to allow devs to get an idea of how many requests they
 * are making when enabling debug mode
 *
 * Notice, it also uses a distinct debug namespace
 */

var apiDebug = require('debug')('remotes:github:api')

process.on('exit', function () {
  apiDebug('used %d', API_COUNTER);
});
