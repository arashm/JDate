
var co = require('co');
var chanel = require('chanel');
var remotes = require('remotes');
var resolve = require('path').resolve;
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var downloader = require('component-downloader');
var debug = require('debug')('component-resolver');

module.exports = Resolver;

inherits(Resolver, EventEmitter);

/**
 * Resolve a component's locals and dependencies.
 * `root` can either be the component.json itself or the working directory.
 *
 * @param {String|Object} root || component
 * @param {Object} options
 * @api public
 */

function Resolver(root, options) {
  options = options || {};
  EventEmitter.call(this, options)

  var concurrency = options.concurrency || {};

  if (!root || typeof root === 'string') {
    this.root = root || process.cwd();
  } else if (typeof root === 'object') {
    // all components need a name!
    // we fix objects as arguments so you can just
    // do {dependencies: {}}
    root.name = root.name || 'root';
    this.main = root;
    this.root = options.root || process.cwd();
  } else {
    throw new TypeError('wtf');
  }

  // include development stuff, false by default
  this.dev = options.dev || options.development;
  // resolve dependencies, true by default
  this.deps = options.dependencies !== false;
  // output folder for installs
  this.out = resolve(options.out
    || options.dir
    || 'components');
  // silent by default
  this.verbose = !!options.verbose;
  // do not log validation warnings by default
  // as it would just make things noisey.
  this.validate = !!options.validate;

  // if you want to set your own remote options
  // like auth, netrc, proxy, etc.,
  // then create your own remote instance.
  if (!(this.remote = options.remote || options.remotes)) {
    this.remote = remotes(remotes.defaults, {
      out: this.out,
      // we check local components by default
      local: options.local !== false,
      timeout: options.timeout || null,
      retries: options.retries || null
    });
    debug('remote not set - defaulting to remotes\'s defaults');
  }

  this.install = !!options.install;
  if (this.install) {
    // fields to check to download files
    this._download = downloader({
      out: this.out,
      remote: this.remote,
      fields: options.fields,
      concurrency: concurrency.downloads || 1,
      verbose: this.verbose,
      archive: options.archive,
    })
  }

  this.channel = {
    locals: chanel({
      // local fs calls.
      // concurrency isn't really necessary here
      // since graceful-fs should handle any EMFILE errors
      concurrency: concurrency.locals || 16,
      discard: true
    }),
    dependencies: chanel({
      // concurrent GET component.json
      concurrency: concurrency.dependencies || 5,
      discard: true
    }),
    semver: chanel({
      // concurrent GET versions calls
      // hitting issues when there are more than a couple
      // channels for semver resolution
      concurrency: concurrency.semver || 1,
      discard: true
    }),
    installs: chanel({
      // concurrent installations
      concurrency: concurrency.installs || 5,
      discard: true
    }),
  }

  // keep track of branches in a flat list
  // so you don't have to traverse a tree
  // has no order!
  this.locals = [];
  this.dependencies = [];

  // keep track of resolution states
  this.state = {};
  // keep track of local component.jsons
  this.cache = {};
  // keep track of any hangs
  this.status = {};
}

/**
 * Call this to execute the resolver and return the tree.
 *
 * @return {Object} tree
 * @api public
 */

Resolver.prototype.tree = function* () {
  // resolve the root component
  var tree = this.branch = yield* this.branchLocal(this.root, this.main);
  // local and github remotes by default
  // if `local: false`, then the `local` remote will be skipped
  if (!tree.remotes.length) tree = tree.concat(remotes.defaults);
  // wait until all the channels are clear
  var ch = this.channel;
  yield ch.locals(true);
  debug('finished resolving locals');
  yield ch.dependencies(true);
  debug('finished resolving dependencies (1)');
  // start resolving all the hanging semvers after
  // all the locals and dependencies are done.
  // not ideal as we should do this ASAP,
  // but i'm not sure how.
  this.semver();
  while (ch.semver.readable || ch.dependencies.readable) {
    // we iterate through semver resolution and
    // dependency resolution until there are no more tasks.
    // this is required for very deeply nested semver deps.
    // yeah, this is kind of ugly.
    // i need a test case for this.
    yield ch.semver(true);
    debug('finished resolving semver');
    // this resolves the semver-based dependencies.
    yield ch.dependencies(true);
    debug('finished resolving dependencies(2)');
  }
  yield ch.installs(true);
  debug('finished installing dependencies');
  return tree;
}

/**
 * Vanilla JS method of `tree = yield* resolver.tree()`.
 *
 * @api public
 */

Resolver.prototype.getTree = co(Resolver.prototype.tree);

/**
 * Resolve a branch's dependency and local branches.
 *
 * @param {Object} branch
 * @api private
 */

Resolver.prototype.resolve = function (branch) {
  debug('resolving "%s"', branch.name);
  var component = branch.node
  var development = this.dev
    && branch.type === 'local'
    && component.development

  // resolve dependencies in a different channel
  if (this.deps) {
    this.resolveDependencies(branch, component.dependencies);
    if (development) this.resolveDependencies(branch, development.dependencies);
  }

  // resolve locals in a different channel
  this.resolveLocals(branch, component.locals);
  if (development) this.resolveLocals(branch, development.locals);

  debug('remaining dependencies: ' + this.channel.dependencies.queue);
  debug('remaining semver: ' + this.channel.semver.queue);
}

/**
 * Await an event.
 *
 * @param {String} event
 * @returns {Object} branch
 * @api private
 */

Resolver.prototype.await = function (event) {
  var self = this
  return function (done) {
    self.once(event, function (branch) {
      done(null, branch);
    });
  };
};

/**
 * Get all the remotes to use in a branch's dependencies.
 *
 * @param {Object} branch
 * @return {Array} remotes
 * @api private
 */

Resolver.prototype.resolveRemotes = function (branch) {
  var remotes = branch.resolvedRemotes = [];
  do {
    var names = branch.remotes || [];
    for (var i = 0; i < names.length; i++)
      if (!~remotes.indexOf(names[i]))
        remotes.push(names[i]);
  } while (branch = branch.parent)
  return remotes;
}
