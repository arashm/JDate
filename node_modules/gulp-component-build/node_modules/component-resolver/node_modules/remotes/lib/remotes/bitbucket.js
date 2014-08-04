var debug = require('debug')('remotes:bitbucket');

var Remote = require('../remote')

var BITBUCKET_USERNAME = process.env.BITBUCKET_USERNAME;
var BITBUCKET_PASSWORD = process.env.BITBUCKET_PASSWORD;

// BitBucket API version 2.0 is missing a lot of the functionality from the 1.0 API.
var API_VERSION = '1.0';

module.exports = BitBucket

Remote.extend(BitBucket)

function BitBucket(options) {
  if (!(this instanceof BitBucket))
    return new BitBucket(options)

  options = Object.create(options || {});

  // set the bitbucket API auth via environment
  // otherwise, use netrc or something.
  if (!options.auth && BITBUCKET_USERNAME && BITBUCKET_PASSWORD)
    options.auth = BITBUCKET_USERNAME + ':' + BITBUCKET_PASSWORD

  Remote.call(this, options)
}

BitBucket.prototype.name = 'bitbucket'

/**
 * DOES NOT SOLVE REDIRECTS!
 *
 * @param {String} repo
 * @return {Array} references
 * @api public
 */

BitBucket.prototype._versions = function* (repo) {
  var uri = 'https://api.bitbucket.org/' + API_VERSION + '/repositories/' + repo + '/tags';
  debug('GET "%s"', uri);
  var res = yield* this.request(uri, true);
  // this shouldn't happen as the remote should be resolved first
  // if it does happen, it could be that the repo was moved and .json() redirected.
  // we need a good UI to fix this
  if (res.statusCode === 404) {
    var err = new Error('failed to get ' + repo + '\'s tags. please check that this repository still exists!');
    err.res = res;
    err.remote = 'bitbucket';
    throw err;
  }
  if (res.statusCode === 403) return errorRateLimitExceeded(res);
  if (res.statusCode === 401) return errorBadCredentials(res);
  if (res.statusCode !== 200) {
    var err = new Error('failed to get ' + repo + '\'s tags');
    err.res = res;
    err.remote = 'bitbucket';
    throw err;
  }

  // Bitbucket doesn't return an array, it returns key/value objects where key == tagname. Convert it to an array
  var result = [],
      temp;

  for(var key in res.body){
    temp = res.body[key];
    temp.name = key;
    result.push(temp);
  }

  return result.map(name);
}

function name(x) {
  return x.name
}

/**
 * Get a component and references's component.json.
 * Tries all endpoints providd by file array returned from BitBucket.prototype.file
 *
 * @param {String} repo
 * @param {String} reference
 * @return {Object} component.json
 * @api public
 */

BitBucket.prototype._json = function* (repo, ref) {
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
      if (!res.body) return malformedJSON(uri, res);
      return res.body;
    }
  }
}

/**
 * NOTE: BitBucket API does not currently support Git trees being returned in a JSON response.
 * DOES NOT SOLVE REDIRECTS!
 *
 * @param {String} repo
 * @param {String} ref
 * @return {Array} objects
 * @api public
 */

/*
BitBucket.prototype._tree = function* (repo, ref){
    var err = new Error('failed to get ' + repo + '\'s git tree. The BitBucket API does not support trees.')
    err.res = res
    err.remote = 'github'
    throw err
}
*/

/**
 * Return URLs of download locations for a particular file.
 * The path must be UNIX-style paths. Support both locations
 * of the BitBucket v1 api and the non-API URL for backup.
 *
 * @param {String} repo
 * @param {String} reference
 * @param {Object} object
 * @return {String} urls
 * @api public
 */

BitBucket.prototype.file = function (repo, ref, path) {
  if (typeof path === 'object') path = path.path;

  var tail = repo + '/raw/' + ref + '/' + path;

  return [
    'https://api.bitbucket.org/'+ API_VERSION + '/repositories/' + tail,
    'https://bitbucket.org/api/' + API_VERSION + '/repositories/'+ tail
  ];
}

/**
 * Return URLs of download locations for archives.
 * BitBucket does not have an API endpoint for this, but repo + ref (tag name, branch)
 * will direct you to necessary download.
 * The path must be UNIX style paths.
 * The file format can be any.
 *
 * @param {String} repo
 * @param {String} reference
 * @return {Object} urls
 * @api public
 */

BitBucket.prototype.archive = function (repo, ref) {
  var root = 'https://bitbucket.org/' + repo + '/get/' + ref;
  // ref is optional here - it will default to the default branch
  // which may or may not be master
  ref = ref ? '/' + ref : '';
  return {
    tar: [
      root + '.tar.gz',
    ],
    zip: [
      root + '.zip',
    ],
    bz2: [
      root + '.tar.bz2'
    ]
  }
}


/**
 * Sometimes BitBucket returns malformed JSON with 200.
 * I don't know why.
 *
 * @param {Object} response
 * @api private
 */

function malformedJSON(uri, res) {
  var err = new Error('bitbucket returned malformed JSON at URL: ' + uri);
  err.res = res;
  err.text = res.text;
  err.remote = 'bitbucket';
  throw err;
}
/**
 * Better error message when rate limit exceeded.
 *
 * @param {Object} response
 * @api private
 */

function errorRateLimitExceeded(res) {
  var err = new Error('BitBucket rate limit exceeded. This is usually very unlikely to happen unless using the REST API to create forks or users - see https://github.com/component/guide/blob/master/changelogs/1.0.0.md#required-authentication');
  err.res = res;
  err.remote = 'bitbucket';
  throw err;
}

/**
 * Better error message when credentials are not supplied.
 *
 * @param {Object} response
 * @api private
 */

function errorBadCredentials(res) {
  var err = new Error('Invalid credentials - please see https://github.com/component/remotes.js#authentication');
  err.res = res;
  err.remote = 'bitbucket';
  throw err;
}
