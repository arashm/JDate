/**
 * Resolver methods for resolving remote dependencies.
 *
 * to do: only allow one concurrent resolve for every dependency `name`, but not reference.
 * would help with the semverisoning,
 * but not really
 */

var semver = require('semver');
var co = require('co');
var join = require('path').join;
var debug = require('debug')('component-resolver:dependencies');

var Resolver = require('./resolver');

/**
 * Create a dependency branch.
 *
 * @param {String} branch
 * @param {String} repo
 * @return {Object} branch
 * @api private
 */

Resolver.prototype.branchDependency = function* (name, ref, parent) {
  var slug = name + '@' + ref
  var state = this.state[slug]
  if (state === 'resolving') {
    // resolving, so return when resolved
    return yield this.await(slug)
  } else if (state === 'resolved') {
    // resolved, so find that branch and return it
    for (var i = 0; i < this.dependencies.length; i++) {
      var dep = this.dependencies[i]
      if (dep.name === name && dep.ref === ref) return dep
    }
    throw new Error('wtf')
  }

  debug('resolving dependency %s@%s', name, ref)
  this.status[slug] = true;

  // mark as resolving
  this.state[slug] = 'resolving'
  var branch = {
    type: 'dependency',
    name: name,
    ref: ref,
    canonical: slug.replace('/', '~'),
    parent: parent,
    version: semver.valid(ref),
    dependencies: {},
    locals: {}, // always empty, but added for consistency
    dependents: []
  }

  var remotes = this.resolveRemotes(branch);

  debug('searching %s for %s@%s', JSON.stringify(remotes), name, ref);

  // this whole section of code checks for the exact version,
  // then checks for w and w/o the leading `v`.
  var remote = yield* this.remote.resolve(remotes, name, ref)
  if (!remote && semver.valid(ref) && ref[0] !== 'v') {
    ref = branch.ref = 'v' + ref
    remote = yield* this.remote.resolve(remotes, name, ref)
    if (!remote) ref = branch.ref = ref.slice(1)
  }
  if (!remote) throw new Error('no remote found for dependency "' + name + '@' + ref + '". run `component open troubleshooting` for help.');

  branch.node = yield* remote.json(name, ref);
  debug('found %s@%s from remote "%s"', name, ref, remote.name);
  if (!branch.node) throw new Error('trouble finding dependency "' + slug + '".');
  branch.path = join(this.out, name, ref);
  branch.filename = join(branch.path, 'component.json');

  this.dependencies.push(branch)
  this.resolve(branch)
  this.state[slug] = 'resolved'
  this.emit(name, branch)
  this.emit(slug, branch)
  if (this.install) this.download(branch);
  delete this.status[slug];
  return branch
}

/**
 * Download a component.
 *
 * @param {Object} branch
 * @api private
 */

Resolver.prototype.download = function (branch) {
  var task = this._download(branch.resolvedRemotes, branch.name, branch.ref);
  this.channel.installs.push(co(task));
}

/**
 * Resolve an object of dependencies.
 *
 * @param {Object} branch
 * @param {Object} dependencies
 * @api private
 */

Resolver.prototype.resolveDependencies = function (branch, deps) {
  if (!deps) return
  var ch = this.channel.dependencies
  Object.keys(deps).forEach(function (name) {
    ch.push(co(this.resolveDependency(branch, name.toLowerCase(), deps[name])))
  }, this)
}

/**
 * Resolve a branch's dependency.
 *
 * to do: remotes
 *
 * @param {Object} branch
 * @param {String} repo
 * @param {String} ref
 * @api {private}
 */

Resolver.prototype.resolveDependency = function* (branch, name, ref) {
  var child = branch.dependencies[name]
  // already resolved
  if (typeof child === 'object') return
  // wait to resolve refs when we do all the semver calls
  if (typeof child === 'string' && !this.resolvingSemver) return
  // try to resolve these now
  // may not be 100% optimal, but will be the fastest
  if (semver.validRange(ref) && !semver.valid(ref)) {
    if (this.resolvingSemver)
      return yield* this.resolveSemver(branch, name, ref)

    var version = this.resolveSemverLocally(branch, name, ref)
    // resolved locally
    if (version) ref = version
    // we'll resolve this later
    // to do: try every time a repo by `name` is resolved
    // until one finally matches
    else return branch.dependencies[name] = ref
  }
  child = yield* this.branchDependency(name, ref, branch)
  branch.dependencies[name] = child
  if (!~child.dependents.indexOf(branch)) child.dependents.push(branch);
  debug('resolved dependencies of "%s"', branch.name);
}

/**
 * Get the currently resolved references of a dependency.
 *
 * @param {String} name
 * @return {Array} references
 * @api private
 */

Resolver.prototype.getReferences = function (name) {
  return this.dependencies.filter(function (dep) {
    return dep.name === name
  }).map(getRef)
}

function getRef(x) {
  return x.ref
}