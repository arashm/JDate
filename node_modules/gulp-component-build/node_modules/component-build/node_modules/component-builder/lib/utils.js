var fs = require('graceful-fs')

/**
 * Check if a file exists. Throws if it does not.
 * Mostly just for a nicer error message.
 *
 * @param {String} filename
 * @return {Object}
 * @api public
 */

exports.exists = function* (filename) {
  try {
    return yield fs.stat.bind(null, filename);
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error('file "' + filename + '" does not exist.');
    throw err;
  }
}

/**
 * Unlink a file. Ignores errors incase it doesn't exist.
 *
 * @param {String} filename
 * @api public
 */

exports.unlink = function* (filename) {
  try {
    yield fs.unlink.bind(null, filename);
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }
}

/**
 * This is how the url rewriter and file copy/symlink will rewrite the file names.
 * This will create names like github's with `/`s.
 * i.e. fortawesome/fontawesome/v4.0.3/fonts/font.woff
 * and, for local components, lib/my-local-component/image.png
 *
 * @param {Object} branch
 * @return {String}
 * @api public
 */

exports.rewriteUrl = function (branch) {
  if (branch.type === 'local') return (branch.relativePath || branch.name).replace(/\\/g, '/');
  if (branch.type === 'dependency') return branch.name + '/' + branch.ref;
}

/**
 * Strip leading `./` from filenames.
 *
 * @param {String} filename
 * @return {String}
 * @api public
 */

exports.stripLeading = function (x) {
  if (x.slice(0, 2) === './') return x.slice(2);
  return x;
}

/**
 * Check if an object is a Generator Function.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

exports.isGeneratorFunction = function (obj) {
  return obj
    && obj.constructor
    && 'GeneratorFunction' === obj.constructor.name;
}
