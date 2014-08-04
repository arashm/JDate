
/**
 * Resolver methods for resolving local dependencies.
 */

var co = require('co');
var path = require('path');
var fs = require('graceful-fs');
var remotes = require('remotes');
var validate = require('component-validator');
var debug = require('debug')('component-resolver:locals');

var Resolver = require('./resolver')

var join = path.join;
var resolve = path.resolve;
var dirname = path.dirname;
var relative = path.relative;

/**
 * Create a branch.
 *
 * @param {String} root
 * @param {Object} component
 * @return {Object} branch
 * @api private
 */

Resolver.prototype.branchLocal = function* (root, component, parent) {
  var state = this.state[root]
  if (state === 'resolving') {
    // resolving, so return the resolved branch
    return yield this.await(root)
  } else if (state === 'resolved') {
    // resolved, so find that branch and return it
    for (var i = 0; i < this.locals.length; i++)
      if (this.locals[i].path === root)
        return this.locals[i]
    throw new Error('wtf')
  }

  debug('resolving local at "%s"', root)

  // mark as resolving
  this.state[root] = 'resolving'
  if (!component) component = yield* this.read(root);
  if (!component) throw new Error('trouble finding component at "' + root + '".');

  var branch = {
    type: 'local',
    path: root,
    filename: join(root, 'component.json'),
    node: component,
    parent: parent,
    locals: {},
    dependencies: {},
    dependents: []
  };

  validate(component, {
    filename: branch.filename,
    verbose: this.validate,
  });

  branch.name = component.name
    // implies the folder name as the name
    || root.replace(dirname(root), '').slice(1);

  // canonical names are relevant to the root
  branch.relativePath = relative(this.root, root);
  if (branch.relativePath.slice(0, 2) === '..') {
    throw new Error('can not require components below the root');
  }
  // normalize path separators: i.e. use '/'
  branch.canonical = (branch.relativePath || branch.name).replace(/\\/g, '/');
  // make sure canonical names are always relative
  // specifically, ./ should be replaced with <app>/
  // note: the root component should NOT have a `./`
  if (branch.parent) branch.canonical = './' + branch.canonical;

  branch.remotes = component.remotes || []
  if (!parent && !branch.remotes.length) {
    // this is supposed to be the "root" component,
    // but i don't like checking for the existence of
    // the parent because it seems hacky to me.
    branch.remotes = ['local'].concat(remotes.defaults);
  }
  this.resolveRemotes(branch);

  // convert the paths to absolute paths
  branch.paths = (component.paths || []).map(function (dir) {
    return resolve(branch.path, dir)
  });

  this.locals.push(branch);
  this.resolve(branch);
  this.state[root] = 'resolved';
  this.emit(root, branch);
  return branch;
}

/**
 * Resolve locals.
 *
 * @param {Object} branch
 * @api private
 */

Resolver.prototype.resolveLocals = function (branch, locals) {
  if (!locals) return;
  var ch = this.channel.locals;
  locals.forEach(function (local) {
    ch.push(co(this.resolveLocal(branch, local)));
  }, this);
}

/**
 * Resolve a branch's local dependency.
 *
 * @param {Object} branch
 * @param {String} name
 * @api private
 */

Resolver.prototype.resolveLocal = function* (branch, name) {
  var path = yield* this.resolveLocalPath(branch, name);
  var child = yield* this.branchLocal(path, null, branch);
  branch.locals[name] = child;
  if (!~child.dependents.indexOf(branch)) child.dependents.push(branch);
  if ((child.node.name || child.name) !== name)
    throw new Error('component at "' + branch.path + '"\'s name does not match the component\'s');
  debug('resolved local "%s"', branch.name);
}

/**
 * Resolve a locals path. We traverse up the tree until
 * we find a local component with `name` in one of the paths.
 *
 * @param {Object} branch
 * @param {String} name
 * @return {String} root
 * @api private
 */

Resolver.prototype.resolveLocalPath = function* (branch, name) {
  debug('resolving "%s"\'s local dependency "%s".', branch.name, name)
  var parent = branch;
  do {
    var paths = parent.paths;
    for (var i = 0; i < paths.length; i++) {
      var path = join(paths[i], name);
      debug('looking up "%s"\'s local dependency "%s" at "%s".', branch.name, name, path)
      try {
        yield stat(join(path, 'component.json'));
        return path;
      } catch (err) {}
    }
  } while (parent = parent.parent)

  throw new Error('Cannot resolve "' + branch.name + '\'s local dependency "' + name + '".');
}

/**
 * Read a component at folder/component.json.
 * Also caches it.
 *
 * @param {String} folder
 * @return {Object}
 * @api private
 */

Resolver.prototype.read = function* read(folder) {
  var filename = join(folder, 'component.json')
  if (filename in this.cache) return this.cache[filename]
  var buf
  try {
    buf = yield fs.readFile.bind(null, filename, 'utf8');
  } catch (_err) {
    if (_err.code !== 'ENOENT') throw _err;
    throw new Error('failed to find a component.json at "' + filename + '".');
  }
  try {
    buf = JSON.parse(buf)
  } catch (_err) {
    throw new Error('error parsing the component.json at "' + filename + '"');
  }
  return this.cache[filename] = buf
}

function stat(filename) {
  return function (done) {
    fs.stat(filename, done)
  }
}
