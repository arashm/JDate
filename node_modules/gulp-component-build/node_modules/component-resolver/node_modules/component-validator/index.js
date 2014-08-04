
var warn = require('component-consoler').warn;

var arrays = [
  'scripts',
  'styles',
  'json',
  'images',
  'fonts',
  'files',
  'locals',
  'remotes',
  'paths',
];

module.exports = function validateComponentJSON(component, options) {
  options = options || {};
  var verbose = options.verbose !== false;
  var filename = options.filename || '';
  var logfilename = '';
  if (filename) {
    // remove a trailing slash just incase
    if (filename.slice(-1) === '/') filename = filename.slice(0, -1);
    // add /component.json just to be consistent
    if (!/\/component\.json$/.test(filename)) filename += '/component.json';
    if (filename) logfilename = '\033[35m' + filename + '\033[90m';
  }

  // local components do not have to have a name
  if ('name' in component
    && !/^[a-z0-9-_.]+$/.test(component.name)
    && verbose) {
    if (logfilename) warn('validate', logfilename);
    warn('validate', '"\033[31m' + component.name + '\033[90m" is an invalid component name.');
    warn('validate', 'Component names may only contain lowercased alphanumerics and dashes.');
    console.error();
  }

  // `repo` is changed to `repository` for consistency
  // and because abbreviations are pointless
  if (component.repo) {
    if (verbose) {
      if (logfilename) warn('validate', logfilename);
      warn('validate', '.repo is deprecated. Use .repository instead.');
      console.error();
    }

    component.repository = component.repo;
    delete component.repo;
  }

  // `local` is changed to `locals` because it's an array
  if (component.local) {
    if (verbose) {
      if (logfilename) warn('validate', logfilename);
      warn('validate', '.local is deprecated. Use .locals instead.');
      console.error();
    }

    component.locals = component.local;
    delete component.local;
  }

  // .development used to be .devDependencies,
  // but now it's a hash of .devDependencies, .scripts, etc.
  var development = component.development || {};
  if (Object.keys(development).length
    && ~Object.keys(development)[0].indexOf('/')) {
    if (verbose) {
      if (logfilename) warn('validate', logfilename);
      warn('validate', '.development\'s signature has changed.');
      warn('validate', 'You probably want `.development.dependencies = {}`.');
      console.error();
    }

    component.development = {
      dependencies: component.development
    };
  }

  // check to make sure properties that should look like arrays
  // look like arrays
  arrays.forEach(function (field) {
    if (!component[field]) return;
    if (Array.isArray(component[field])) return;
    var msg = 'The .' + field + ' field must be an array. ';
    if (filename) msg += 'Please check "' + filename + '".';
    throw new Error(msg);
  });

  if (development.constructor !== Object) {
    var msg = 'The .development field must be an object. ';
    if (filename) msg += 'Please check "' + filename + '".';
    throw new Error(msg);
  }

  var dependencies = component.dependencies;
  if (dependencies) {
    if (dependencies.constructor !== Object) {
      var msg = 'The .dependencies field must be an object. ';
      if (filename) msg += 'Please check "' + filename + '".';
      throw new Error(msg);
    }

    Object.keys(dependencies).forEach(function (dependency) {
      if (isValidDependency(dependency)) return;
      var msg = '"' + dependency + '" is in invalid dependency name. ';
      if (filename) msg += 'Please check "' + filename + '".';
      throw new Error(msg);
    })
  }

  return component;
}

// check to make sure a string is a valid dependency
// will be changed in the future
// see: https://github.com/component/spec/issues/52
// maybe: make sure dependencies are all lowered cased?
function isValidDependency(string) {
  if (/^[\w-]+\/[\w-.]+$/.test(string)) return true;
  return false;
}
