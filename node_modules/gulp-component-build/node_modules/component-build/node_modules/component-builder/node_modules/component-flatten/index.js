
var semver = require('semver')

/**
 * returns the tree nodes, not the component.json,
 * so you can handle the resolved deps yourself.
 *
 * @param {Object} tree
 * @return {Array}
 * @api public
 */

module.exports = function (tree) {
  var resolved = []
  var deps = {}
  var dependencies = []
  var locals = []

  // duplicate dependencies
  var duplicates = {};

  traverse(tree)

  // flatten the dependencies
  Object.keys(deps).forEach(function (name) {
    var branches = deps[name]
    var releases = Object.keys(branches)
    // duplicates detected
    if (releases.length > 1) duplicates[name] = branches;
    releases
    // non semver releases first
    .filter(function (release) {
      if (semver.valid(release)) return true
      dependencies.push(branches[release])
      return false
    })
    // ascending semver version
    .sort(semver.compare)
    .forEach(function (release) {
      dependencies.push(branches[release])
    })
  })

  var out = dependencies.concat(locals);
  out.duplicates = duplicates;
  return out;

  function traverse(branch) {
    if (~resolved.indexOf(branch)) return
    resolved.push(branch)
    traverseDeps(branch)
    traverseLocals(branch)
    if (branch.type === 'local') return locals.push(branch)
    // group together a component and its duplicate releases
    var releases = deps[branch.name] = deps[branch.name] || {}
    releases[branch.ref] = branch
  }

  function traverseDeps(branch) {
    var deps = branch.dependencies
    if (!deps) return
    var names = Object.keys(deps)
    for (var i = 0; i < names.length; i++)
      traverse(deps[names[i]])
  }

  function traverseLocals(branch) {
    var locals = branch.locals
    if (!locals) return
    var names = Object.keys(locals)
    for (var i = 0; i < names.length; i++)
      traverse(locals[names[i]])
  }
}
