
var Build = require('component-builder');

var plugins = Build.plugins;

exports.files = function (done) {
  var options = this.options;
  var build = Build.files(this.tree, options);
  this.filePlugins(build, options);
  build.end(done);
}

exports.filePlugins = function (build, options) {
  var plugin = options.copy
    ? plugins.copy(options)
    : plugins.symlink(options);

  build
  .use('images', plugin)
  .use('fonts', plugin)
  .use('files', plugin);
}
