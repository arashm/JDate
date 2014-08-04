
var Build = require('component-builder');
var es6modules = require('builder-es6-module-to-cjs');

var umd = Build.scripts.umd;
var canonical = Build.scripts.canonical;
var requirejs = Build.scripts.require;
var plugins = Build.plugins;

exports.scripts = function (done) {
  var tree = this.tree;
  var options = this.options;
  var require = options.require != null
    ? options.require
    : true;
  var autorequire = options.autorequire !== false;

  var build = Build.scripts(tree, options);
  this.scriptPlugins(build, options);
  build.end(function (err, js) {
    if (err) return done(err);
    if (!js) return done(null, '');

    // here we do the entry-point nonsense
    var alias = options.standalone || options.umd;
    if (alias) {
      tree = canonical(tree);
      var alias = typeof alias === 'string'
        ? alias
        : (tree.node.standalone || tree.node.name);
      js = umd(tree.canonical, alias, js);
    } else {
      if (require) js = requirejs + js;
      if (autorequire) js += 'require("' + canonical(tree).canonical + '")\n';
    }

    done(null, js);
  })
}

exports.scriptPlugins = function (build, options) {
  build
  .use('scripts',
    es6modules(options),
    plugins.js(options))
  .use('json',
    plugins.json(options))
  .use('templates',
    plugins.string(options));
}
