var Resolver = require('./resolver');

;[
  'locals',
  'dependencies',
  'semver',
].forEach(function (x) {
  require('./' + x);
});

module.exports = resolve;

/**
 * Wrap the API so you can do:
 *
 *   resolve(__dirname, {}, function (err, tree) {})
 *
 * or
 *
 *   var tree = yield* resolve(__dirname, {})
 *
 * I'm not sure what other API people might want.
 * Anything like `.set(key, value)` should be done in a higher level lib.
 */

function resolve(root, options, done) {
  if (typeof options === 'function') {
    done = options;
    options = {};
  }
  var resolver = new Resolver(root, options);
  if (typeof done === 'function') {
    // regular callback
    resolver.getTree(done);
  } else {
    // generators
    return resolver.tree();
  }
}

// expose flatten just because
resolve.flatten = require('component-flatten');