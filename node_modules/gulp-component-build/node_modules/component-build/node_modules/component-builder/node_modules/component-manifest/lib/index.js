
var fs = require('graceful-fs');
var resolve = require('path').resolve;
var unglobDirectory = require('unglob').directory;

/**
 * Convert a branch from `component-resolver`
 * into a "manifest" object.
 * Each manifest object will have a list of files,
 * which the builder will iterate over.
 *
 * `options` should be passed directly from the resolver.
 *
 */

module.exports = function Manifest(options) {
  return function* createManifest(branch) {
    var manifest = {
      // cross referencing
      branch: branch,
      node: branch.node,
      path: branch.path,
      name: branch.canonical,
    };

    yield* unglob(manifest);
    createFiles(manifest);

    return manifest;
  }

  /**
   * Unglob the `fields` of the component
   * and populate manifest.field.
   *
   * @param {Object} branch
   * @api private
   */

  function* unglob(manifest) {
    var branch = manifest.branch;
    var node = manifest.node;
    // dev stuff is only relevant to local components
    // to do: not local components of remote components
    var dev = (options.dev
      && branch.type === 'local'
      && node.development)
      || {};

    var fields = {};
    options.fields.forEach(function (field) {
      var paths = [];
      if (node[field]) paths = paths.concat(node[field]);
      if (dev[field]) paths = paths.concat(dev[field]);
      fields[field] = unglobDirectory(paths, branch.path);
    });
    manifest.field = yield fields;
  }

  /**
   * Convert all the paths in `manifest.field`
   * into file objects, then populate `manifest.files`.
   *
   * @param {Object} branch
   * @api private
   */

  function createFiles(manifest) {
    var branch = manifest.branch;
    var fields = manifest.field;
    var files = [];

    options.fields.forEach(function (field) {
      var objs =
      fields[field] = fields[field].map(toFileObject);
      files = files.concat(objs);
    });

    manifest.files = files;

    function toFileObject(path) {
      var file = {
        path: path, // path according to component.json
        manifest: manifest,
        branch: branch,
        node: branch.node,
        filename: resolve(branch.path, path),
        extension: path.split('.').pop(),
      };

      file.read = read(file);

      return file;
    }
  }
}

/**
 * Populate `file.string` asynchronously by doing `yield file.read`.
 * If you want to use a caching mechanism here or something
 * for reloads, you can overwrite this method.
 *
 * @param {Object} file
 * @api public
 */

function read(file) {
  var string;
  return function (done) {
    // already read
    if (typeof file.string === 'string') return done(null, file.string);
    if (typeof string === 'string') return done(null, string);
    fs.readFile(file.filename, 'utf8', function (err, str) {
      if (err) {
        return done(new Error('failed to read "'
          + file.manifest.name
          + '"\'s file "'
          + file.path
          + '"'));
      }
      done(null, string = str);
    })
  }
}
