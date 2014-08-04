var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var resolver = require('component-resolver');
var Build = require('component-build');

module.exports = gulpComponentBuild;

/**
 * gulp plugin for build with component-build.
 */
var PLUGIN_NAME = 'gulp-component-build';
function gulpComponentBuild() {}

/**
 * build scripts.
 *
 * @param {Object} option for component-build option.
 * @param {Function} configure build configuration function.
 */
gulpComponentBuild.scripts = function(option, configure) {
  configure = typeof configure === 'function' ? configure : function() {};

  return through.obj(function(file, enc, callback) {
    var that = this;

    // file object for next gulp plugin.
    var next = new gutil.File({
      cwd: file.base,
      base: file.base,
      path: file.base + 'build.css' // use gulp-rename if you want change this.
    });

    // for empty.
    if (file.isNull()) {
      that.emit('error', new gutil.PluginError(PLUGIN_NAME, 'component.json was not found: `' + file.path + '`'));
      return callback();
    }

    // for buffer.
    if (file.isBuffer()) {
      scripts(file, option, configure, function(err, string) {
        if (err) {
          that.emit('error', err);
          return callback();
        }

        next.contents = new Buffer(string);
        that.push(next);
        callback();
      });
    }

    // for stream.
    if (file.isStream()) {
      file.on('error', that.emit.bind(this, 'error'));
      file.contents = file.contents.pipe(through.obj(function(file, enc, callback) {
        scripts(file, option, configure, function(err, string) {
          if (err) {
            that.emit('error', err);
            return callback();
          }

          next.contents = string;
          that.push(next);
          callback();
        });
      }));
      callback();
    }
  });
};

/**
 * build styles.
 *
 * @param {Object} option for component-build option.
 * @param {Function} configure build configuration function.
 */
gulpComponentBuild.styles = function(option, configure) {
  configure = typeof configure === 'function' ? configure : function() {};

  return through.obj(function(file, enc, callback) {
    var that = this;

    // file object for next gulp plugin.
    var next = new gutil.File({
      cwd: file.base,
      base: file.base,
      path: file.base + 'build.css' // use gulp-rename if you want change this.
    });

    // for empty.
    if (file.isNull()) {
      that.emit('error', new gutil.PluginError(PLUGIN_NAME, 'component.json was not found: `' + file.path + '`'));
      return callback();
    }

    // for buffer.
    if (file.isBuffer()) {
      styles(file, option, configure, function(err, string) {
        if (err) {
          that.emit('error', err);
          return callback();
        }

        next.contents = new Buffer(string);
        that.push(next);
        callback();
      });
    }

    // for stream.
    if (file.isStream()) {
      file.on('error', that.emit.bind(this, 'error'));
      file.contents = file.contents.pipe(through.obj(function(file, enc, callback) {
        styles(file, option, configure, function(err, string) {
          if (err) {
            that.emit('error', err);
            return callback();
          }

          next.contents = string;
          that.push(next);
          callback();
        });
      }));
      callback();
    }
  });
};

/**
 * build files.
 * ! this stream does not delegate next plugin.
 *
 * @param {Object} option for component-build option.
 * @param {Function} configure build configuration function.
 */
gulpComponentBuild.files = function(option, configure) {
  configure = typeof configure === 'function' ? configure : function() {};

  return through.obj(function(file, enc, callback) {
    var that = this;

    // for empty.
    if (file.isNull()) {
      that.emit('error', new gutil.PluginError(PLUGIN_NAME, 'component.json was not found: `' + file.path + '`'));
      return callback();
    }

    // for buffer.
    if (file.isBuffer()) {
      files(file, option, configure, function(err) {
        if (err) {
          that.emit('error', err);
          return callback();
        }

        callback();
        that.emit('end');
      });
    }

    // for stream.
    if (file.isStream()) {
      file.on('error', that.emit.bind(this, 'error'));
      file.contents = file.contents.pipe(through.obj(function(file, enc, callback) {
        files(file, option, configure, function(err, string) {
          if (err) {
            that.emit('error', err);
            return callback();
          }

          callback();
          that.emit('end');
        });
      }));
      callback();
    }
  });
};

/**
 * build scripts with component-resolver and component-build.
 *
 * @param {Object} file gulp provided file.
 * @param {Object} option for component-build option.
 * @param {Function} configure build configuration function.
 * @param {Function} done
 */
function scripts(file, option, configure, done) {
  resolver(path.dirname(file.path), option, function(err, tree) {
    if (err) return done(err);

    var scripts = Build(tree, option);
    var plugins = scripts.scriptPlugins;
    scripts.scriptPlugins = function(build, option) {
      plugins.call(scripts, build, option);
      configure(build, option);
    };
    configure(scripts); // apply user customize.
    scripts.scripts(function(err, string) {
      if (err) return done(err);

      done(null, string);
    });
  });
}

/**
 * build styles with component-resolver and component-build.
 *
 * @param {Object} file gulp provided file.
 * @param {Object} option for component-build option.
 * @param {Function} configure build configuration function.
 * @param {Function} done
 */
function styles(file, option, configure, done) {
  resolver(path.dirname(file.path), option, function(err, tree) {
    if (err) return done(err);

    var styles = Build(tree, option);
    var plugins = styles.stylePlugins;
    styles.stylePlugins = function(build, option) {
      plugins.call(styles, build, option);
      configure(build, option);
    };
    styles.styles(function(err, string) {
      if (err) return done(err);

      done(null, string);
    });
  });
}

/**
 * build files with component-resolver and component-build.
 *
 * @param {Object} file gulp provided file.
 * @param {Object} option for component-build option.
 * @param {Function} configure build configuration function.
 * @param {Function} done
 */
function files(file, option, configure, done) {
  resolver(path.dirname(file.path), option, function(err, tree) {
    if (err) return done(err);

    var files = Build(tree, option);
    var plugins = files.filePlugins;
    files.filePlugins = function(build, option) {
      plugins.call(files, build, option);
      configure(build, option);
    };
    files.files(done);
  });
}

