/**
 * Resolve any semvers including `*` that weren't satisifed during resolving dependencies.
 *
 * Note that this isn't really optimal yet and probably won't ever be!
 * Please use wide semver ranges!
 *
 * To do:
 *
 *   - resolve all semver ranges before `*`s
 */

var co = require('co')
var semver = require('semver')
var debug = require('debug')('component-resolver:semver')

var Resolver = require('./resolver')

/**
 * Iterate through all the locals and dependencies to resolve semvers.
 *
 * @api private
 */

Resolver.prototype.semver = function () {
  // now all dependencies will be resolved
  // with github API calls
  this.resolvingSemver = true
  this.locals.forEach(this.resolveSemvers, this)
  this.dependencies.forEach(this.resolveSemvers, this)
}

/**
 * Iterate through all the .dependencies of the branch
 * and resolve.
 *
 * @param {Object} branch
 * @api private
 */

Resolver.prototype.resolveSemvers = function (branch) {
  var ch = this.channel.semver
  Object.keys(branch.dependencies).forEach(function (name) {
    var ref = branch.dependencies[name]
    if (typeof ref !== 'string') return
    ch.push(co(this.resolveSemver(branch, name, ref)))
  }, this)
}

/**
 * Resolve semver. First, we try locally, then we try remotely.
 *
 * @param {Object} branch
 * @param {String} name
 * @param {String} reference
 * @api private
 */

Resolver.prototype.resolveSemver = function* (branch, name, ref) {
  debug('resolving semver %s@%s', name, ref);
  var slug = name + '@' + ref;
  var state = this.state[slug];
  if (state === 'resolving') return resolve(yield this.await(slug));
  // unlike resolving dependencies,
  // we cache the object here.
  else if (typeof state === 'object') return resolve(state);

  this.state[slug] = 'resolving';
  this.status[slug] = true;

  // convert the semver range to a reference
  ref = this.resolveSemverLocally(branch, name, ref)
    || (yield* this.resolveSemverRemotely(branch, name, ref))
  var child = yield* this.branchDependency(name, ref, branch)
  resolve(child);
  debug('resolved semver %s -> %s@%s', slug, name, ref);
  this.emit(slug, child)
  this.state[slug] = child
  delete this.status[slug];

  function resolve(child) {
    branch.dependencies[name] = child;
    if (!~child.dependents.indexOf(branch)) child.dependents.push(branch);
  }
}

/**
 * Resolve semver locally without touching the remote if possible
 *
 * @param {String} name
 * @param {String} ref
 * @return {String} reference
 * @api private
 */

Resolver.prototype.resolveSemverLocally = function (branch, name, ref) {
  var references = this.getReferences(name)
  var versions = references
    .filter(semver.valid)
    .sort(semver.rcompare)
  var version = semver.maxSatisfying(versions, ref)
  if (version) return version
  // can not be resolved with semver
  if (ref !== '*') return
  var branches = references.filter(function (ref) {
    // they need a method for this :(
    return !semver.valid(ref)
  })
  // return any release
  if (branches.length) return branches[0]
}

/**
 * Resolve semver by accessing the remote.
 *
 * @param {String} name
 * @param {String} ref
 * @return {String} reference
 * @api private
 */

Resolver.prototype.resolveSemverRemotely = function* (branch, name, ref) {
  var remotes = branch.resolvedRemotes;
  // try resolve using resolvedRemotes but
  // special case 'local' if unsuccessful
  // i.e. if 'ref' is not satisfied by 'local' afford
  // non-local resolvedRemotes to try to resolve it
  do {
    var remote = yield* this.remote.resolve(remotes, name);
    if (!remote) throw new Error('no remote found for dependency "' + name + '".');
    var versions = yield* remote.versions(name);
    var version = semver.maxSatisfying(versions, ref);
    if (version) return version;
    remotes = remotes.filter(nonLocal);
  } while (remote.name === 'local' && ref !== '*');

  // no satisfying versions!
  // this is an error for semver ranges
  if (ref !== '*') throw new Error('invalid semver range "' + ref + '" for "' + name + '"');
  // to do: use the actual "main" branch
  // ex. gh-pages
  return 'master';
}

function nonLocal(remote) {
  return (remote !== 'local');
}
