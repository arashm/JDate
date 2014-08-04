
var debug = require('debug')('component-builder:scripts');
var relative = require('path').relative;
var requires = require('requires');
var fs = require('graceful-fs');
var url = require('url');

var Builder = require('./builder');
var utils = require('../utils');

// default extension to look up
var extensions = [
  '',
  '.js',
  '.json',
  '/index.js',
]

module.exports = Scripts

Builder.extend(Scripts)

/**
 * require() implementation.
 * Not included by default.
 *
 * @api public
 */

Scripts.require = fs.readFileSync(require.resolve('component-require2'), 'utf8');

/**
 * Return the entry point of a tree.
 * i.e. the canonical name of the first component
 * with a JS entry point, allowing you to
 * `require(<canonical>.canonical)` to initiate all the
 * components.
 *
 * @param {Object} tree
 * @return {Object} tree
 * @api public
 */

Scripts.canonical = function (tree) {
  // main root has it's own scripts,
  // so it's an entry point.
  var scripts = tree.node.scripts;
  if (scripts && scripts.length) return tree;

  var locals = tree.locals;
  var names = Object.keys(locals);
  if (names.length !== 1) {
    throw new Error('failed to resolve the entry point of component "' + tree.name + '". please either have .scripts or a single .locals in your main component.');
  }
  return locals[names[0]];
}

/**
 * UMD-wrap a build based on the entry point
 * `canonical`, a global `alias`, and the `js`.
 *
 * @param {String} canonical
 * @param {String} alias
 * @param {String} js
 * @return {String}
 * @api public
 */

Scripts.umd = function (canonical, alias, js) {
  return '\n;(function(){\n\n'
    + Scripts.require
    + js
    + 'if (typeof exports == "object") {\n'
    + '  module.exports = require("' + canonical + '");\n'
    + '} else if (typeof define == "function" && define.amd) {\n'
    +'  define([], function(){ return require("' + canonical + '"); });\n'
    + '} else {\n'
    + '  this["' + alias + '"] = require("' + canonical + '");\n'
    + '}\n'
    + '})()\n';
}

function Scripts(branches, options) {
  if (!(this instanceof Scripts)) return new Scripts(branches, options);

  options = options || {};
  Builder.call(this, branches, options);

  // source map support isn't really working yet
  this.sourceMap = options.sourceMap;
  // default enable sourceURLs in dev mode
  this.sourceURL = options.sourceURL != null
    ? options.sourceURL
    : this.dev;
  // default enable aliases in dev mode
  this.alias = options.alias != null ? options.alias
    : options.aliases != null ? options.aliases
    : this.dev;
}

/**
 * Go through all the branches, filter out the components,
 * then format it so we can proces them easier.
 *
 * @param {Object} branch
 * @api private
 */

Scripts.prototype.resolve = function (manifest) {
  // no files, we can skip
  if (!manifest.files.length) return;

  this.resolveMain(manifest);

  manifest.files.forEach(function (file) {
    // commonjs registered name
    file.name = manifest.name + (file.path === manifest.main
      ? ''
      : '/' + file.path);
  });

  this.dispatch(manifest);

  if (this.alias) {
    var self = this;
    this.channel.push(function (done) {
      done(null, self.aliasModule(manifest));
    });
  }
}

/**
 * Resolve the `.main` script.
 *
 * @param {Object} manifest
 * @api private
 */

Scripts.prototype.resolveMain = function (manifest) {
  var component = manifest.node;
  if (component.main) manifest.main = utils.stripLeading(component.main);

  var files = manifest.files;
  if (!component.main) {
    // if no manifest.main, guess by checking files for an index.:format
    for (var i = 0; i < files.length; i++) {
      var path = files[i].path;
      if (/^index\.\w+/.test(path)) {
        manifest.main = path;
        break;
      }
    }
  }

  // do some magic - select the first file
  if (!manifest.main) manifest.main = manifest.files[0].path;
}

/**
 * The last middleware of every field.
 * Checks to see if the file is "used",
 * then appends it if it is.
 *
 * @param {Object} field
 * @param {Object} file
 * @return {String}
 * @api private
 */

Scripts.prototype.append = function* (field, file) {
  yield* this.transform(field, file);
  // read file now if not already read
  if (file.string === true) file.string = yield file.read;
  // if no file.string, ignore this file
  if (typeof file.string !== 'string') return '';
  return this[file.define ? 'define' : 'register'](file) + '\n\n';
}

/**
 * Register a file with the require.register(name, new Function()) stuff.
 * This is added to the end of every middleware stack.
 *
 * To do:
 *
 *   - more aliases for dynamic requires. need to make sure only do one module per alias in case of duplicates.
 *   - define them all at once in one giant object? hahaha dm;gzip
 *
 * @param {Object} file
 * @return {String}
 * @api private
 */

Scripts.prototype.register = function (file) {
  var self = this;
  var js = file.string;

  // rewrite all the requires
  js = requires(js, function (require) {
    return 'require("'
      + self.lookup(file, require.path)
      + '")';
  });

  var name = file.name;
  if (this.sourceMap || this.sourceURL) {
    if (this.sourceMap && file.sourceMap) {
      js += '\n//# sourceMappingURL='
        + 'data:application/json;charset=utf-8;base64,'
        + new Buffer(file.sourceMap).toString('base64');
    } else {
      js += '\n//# sourceURL=' + relative(this.root, file.filename);
    }
    js = JSON.stringify(js);
    js = js.replace(/\\n/g, '\\n\\\n');
    js = 'require.register("'
      + name
      + '", Function("exports, module",\n'
      + js
      + '\n));';
  } else {
    js = 'require.register("'
      + name
      + '", function (exports, module) {\n'
      + js
      + '\n});';
  }

  return js;
}

/**
 * Define a module without the closure.
 * Specifically for JSON and strings.
 *
 * @param {Object} file
 * @return {String}
 * @api private
 */

Scripts.prototype.define = function (file) {
  return 'require.define("' + file.name + '", ' + file.string + ');';
}

/**
 * Add aliases for modules to be used outside the build.
 * For depedencies, these are:
 *
 *   <user>-<repo>
 *   <user>~<repo>
 *   <repo>
 *
 * And for locals, these are:
 *
 *   <local-name>
 *
 * Note that these are aliased independently,
 * so a component defined later in the build may overwrite
 * components defined earlier. In general,
 * local components will overwrite remote components,
 * but that's why they are namespaced with <user>.
 *
 * This is NOT meant to be used in production.
 * Use a bundling system or create a local that exposes globals via `window`.
 *
 * This is important for tests until we have a built-in testing framework.
 *
 * This also won't work with reaching, i.e.
 *
 *   require('local/file.js');
 *
 * @param {Object} manifest
 * @api private
 */

Scripts.prototype.aliasModule = function (manifest) {
  var branch = manifest.branch;
  var names;

  switch (branch.type) {
    case 'dependency':
      names = [
        branch.name.replace('/', '-'),
        branch.name.replace('/', '~'),
        branch.name.split('/').pop(),
      ];
      break;
    case 'local':
      names = [branch.name];
      break;
  }

  if (!names) return '';

  return names.map(function (name) {
    return 'require.modules[' + JSON.stringify(name) + '] = '
      + 'require.modules[' + JSON.stringify(branch.canonical) + '];\n'
  }).join('') + '\n\n';
}

/**
 * From a file, lookup another file within that dep.
 * For use within `require()`s.
 *
 * To do:
 *
 *   - people like @raynos will want to be able to do require('component/lib') or something but F that!
 *
 * @param {Object} file
 * @param {String} target
 * @return {String} name
 * @api private
 */

Scripts.prototype.lookup = function (file, target) {
  target = target.toLowerCase();

  return target.slice(0, 2) === './' || target.slice(0, 3) === '../'
    ? this.lookupRelative(file, target)
    : this.lookupDependency(file, target);
}

/**
 * Lookup a relative file.
 *
 * @param {Object} file
 * @param {String} target
 * @return {String} name
 * @api private
 */

Scripts.prototype.lookupRelative = function (file, target) {
  var path = url.resolve(file.path, target);
  var files = file.manifest.files;

  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    for (var j = 0; j < extensions.length; j++) {
      // check by adding extensions
      if (f.path.toLowerCase() === path + extensions[j]) return f.name;
    }
    // check by removing extensions
    if (f.path.replace(/\.\w+$/, '').toLowerCase() === path) return f.name;
  }

  var message = 'could not resolve "' + target + '" from "' + file.branch.name + '"\'s file "' + file.path + '"';
  if (file.branch.type === 'local') throw new Error(message);
  debug(message);
  return target;
}

/**
 * Look up a remote dependency.
 * Valid references:
 *
 *   <repo>
 *   <user>-<repo>
 *   <user>~<repo>
 *
 * or:
 *
 *   <reference>/<filename>
 *
 * @param {Object} component
 * @param {Object} file
 * @param {String} target
 * @return {String} name
 * @api private
 */

Scripts.prototype.lookupDependency = function (file, target) {
  var frags = target.split('/');
  var reference = frags[0];
  var tail = frags.length > 1
    ? ('/' + frags.slice(1).join('/'))
    : ''

  var branch = file.branch;
  var deps = branch.dependencies;
  var names = Object.keys(deps);

  // <user>~<repo>
  if (~reference.indexOf('~')) {
    var name = reference.replace('~', '/');
    if (deps[name]) return deps[name].canonical + tail;
  }

  // <user>-<repo>
  if (~reference.indexOf('-')) {
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (reference === name.replace('/', '-')) {
        return deps[name].canonical + tail;
      }
    }
  }

  // local
  if (branch.locals[target]) return branch.locals[target].canonical + tail;

  // <repo>
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var repo = name.split('/')[1];
    if (repo === reference) {
      return deps[name].canonical + tail;
    }
  }

  // component.json name, if different than repo
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var dep = deps[name];
    if (dep.node.name.toLowerCase() === reference) {
      return dep.canonical + tail;
    }
  }

  // to do: look up stuff outside the dependencies
  debug('could not resolve "%s" from "%s"', target, file.name)
  return target
}
