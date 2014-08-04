
var co = require('co');
var chanel = require('chanel');
var resolve = require('path').resolve;
var inherits = require('util').inherits;
var flatten = require('component-flatten');
var manifest = require('component-manifest');

var utils = require('../utils');

var slice = [].slice;
var isGeneratorFunction = utils.isGeneratorFunction;

module.exports = Builder;

/**
 * Easier than doing util.inherits.
 *
 * @param {Function} construct
 * @return {Function} construct
 * @api private
 */

Builder.extend = function (construct) {
  inherits(construct, this);
  return construct;
}

/**
 * The script and styles builder inherits from this.
 */

function Builder(branches, options) {
  this.initialize(branches, options);
}

/**
 * Push a function to the middleware based on `field`.
 * `fn` can either by a synchronous function,
 * an asynchronous function with callback,
 * or a generator function.
 *
 * synchronous and generator functions will be called with
 *
 *   fn.call(this, file)
 *
 * asynchronous will be called with
 *
 *   fn.call(this, file, function (err) {})
 *
 * @param {String} field
 * @param {Function} fn
 * @api public
 */

Builder.prototype.use = function (field, fn) {
  // handle multiple middleware at once like express
  if (arguments.length > 2) {
    slice.call(arguments, 1).forEach(function (fn) {
      this.use(field, fn);
    }, this);
    return this;
  }

  var stacks = this.fns;
  var stack = stacks[field] = stacks[field] || [];
  stack.push(fn);
  return this;
}

/**
 * Initialize the builder with options.
 * Split because `Files` uses this stuff
 * but not the other stuff.
 *
 * @param {Array} branches
 * @param {Object} options
 * @api private
 */

Builder.prototype.initialize = function (branches, options) {
  // automatically flatten a tree from component-resolver
  if (!Array.isArray(branches)) branches = flatten(branches);

  // middleware
  this.fns = {};
  this.branches = branches;
  // in all builders, dev mode includes `.development` fields
  // in local components. `.development` fields are
  // always ignored in remote components.
  this.dev = !!(options.development || options.dev);
  // where the components are installed
  // bad name, but it's the same option name as resolver.js
  this.out = resolve(options.out || 'components');
  this.root = resolve(options.root || process.cwd());
  this.channel = chanel({
    // concurrency is pretty unnecessary here
    // thanks to graceful-fs
    concurrency: options.concurrency || 16,
  });
}

/**
 * Runs the entire build process.
 * Does NOT return the final build.
 * To get the final build, do `return yield ch(true)`.
 * You should execute this __after__ adding middleware.
 *
 * @api private
 */

Builder.prototype.run = co(function* () {
  // to avoid doing this all the time
  // note that `this.fields` is based on the middleware actually used
  this.fields = Object.keys(this.fns);

  // create the manifest objects
  var manifests = yield this.branches.map(manifest(this));
  // dispatch all the files in each manifest
  manifests.forEach(this.resolve, this);
})

/**
 * User-facing function that tells the builder
 * that all middleware is attached,
 * and to return the result.
 * Aliased as build().
 *
 * @api public
 */

Builder.prototype.build =
Builder.prototype.end = function (done) {
  var self = this;
  var ch = this.channel;
  setImmediate(function () {
    done = done || noop;
    self.run(function (err) {
      if (err) return done(err);
      ch(true, function (err, results) {
        if (err) return done(err);
        done(null, results && results.join(''))
      });
    });
  });
  return function (fn) {
    done = fn;
  }
}

/**
 * Runs all of `field`'s middleware on a file.
 *
 * @param {String} field
 * @param {Object} file
 * @api private
 */

Builder.prototype.append =
Builder.prototype.transform = function* (field, file) {
  var fns = this.fns[field];
  for (var i = 0; i < fns.length; i++) {
    var fn = fns[i];
    // generator function
    if (isGeneratorFunction(fn)) yield* fn.call(this, file);
    // async function
    else if (fn.length === 2) yield fn.bind(this, file);
    // sync function
    else fn.call(this, file);
  }
}

/**
 * Push all the files of `files` split by fields's transforms to the channel.
 *
 * @param {Object} manifest
 * @api private
 */

Builder.prototype.resolve =
Builder.prototype.dispatch = function (manifest) {
  var ch = this.channel;
  var fields = this.fields;
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var files = manifest.field[field];
    for (var j = 0; j < files.length; j++) {
      ch.push(co(this.append(field, files[j])));
    }
  }
}

function noop() {}
