
var Build = require('component-builder');
var autoprefix = require('builder-autoprefixer');

var plugins = Build.plugins;

exports.styles = function (done) {
  var options = this.options;
  var build = Build.styles(this.tree, options);
  this.stylePlugins(build, options);
  build.end(function (err, css) {
    if (err) return done(err);
    if (!css) return done(null, '');
    done(null, css);
  });
}

exports.stylePlugins = function (build, options) {
  build
  .use('styles',
    plugins.urlRewriter(options.prefix || ''),
    autoprefix(options));
}
