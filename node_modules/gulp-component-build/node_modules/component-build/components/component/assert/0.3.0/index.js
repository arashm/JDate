
/**
 * Module dependencies.
 */

var stack = require('stack');
var equals = require('equals');

/**
 * Assert `expr` with optional failure `msg`.
 *
 * @param {Mixed} expr
 * @param {String} [msg]
 * @api public
 */

module.exports = exports = function (expr, msg) {
  if (expr) return;
  throw new Error(message());
};

/**
 * Assert `actual` is weak equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.equal = function (actual, expected, msg) {
  if (actual == expected) return;
  throw new Error(message());
};

/**
 * Assert `actual` is not weak equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.notEqual = function (actual, expected, msg) {
  if (actual != expected) return;
  throw new Error(message());
};

/**
 * Assert `actual` is deep equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.deepEqual = function (actual, expected, msg) {
  if (equals(actual, expected)) return;
  throw new Error(message());
};

/**
 * Assert `actual` is not deep equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.notDeepEqual = function (actual, expected, msg) {
  if (!equals(actual, expected)) return;
  throw new Error(message());
};

/**
 * Assert `actual` is strict equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.strictEqual = function (actual, expected, msg) {
  if (actual === expected) return;
  throw new Error(message());
};

/**
 * Assert `actual` is not strict equal to `expected`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} [msg]
 * @api public
 */

exports.notStrictEqual = function (actual, expected, msg) {
  if (actual !== expected) return;
  throw new Error(message());
};

/**
 * Assert `block` throws an `error`.
 *
 * @param {Function} block
 * @param {Function} [error]
 * @param {String} [msg]
 * @api public
 */

exports.throws = function (block, error, msg) {
  var err;
  try {
    block();
  } catch (e) {
    err = e;
  }
  if (!err) throw new Error(message());
  if (error && !(err instanceof error)) throw new Error(message());
};

/**
 * Assert `block` doesn't throw an `error`.
 *
 * @param {Function} block
 * @param {Function} [error]
 * @param {String} [msg]
 * @api public
 */

exports.doesNotThrow = function (block, error, msg) {
  var err;
  try {
    block();
  } catch (e) {
    err = e;
  }
  if (error && (err instanceof error)) throw new Error(message());
  if (err) throw new Error(message());
};

/**
 * Create a message from the call stack.
 *
 * @return {String}
 * @api private
 */

function message() {
  if (!Error.captureStackTrace) return 'assertion failed';
  var callsite = stack()[2];
  var fn = callsite.getFunctionName();
  var file = callsite.getFileName();
  var line = callsite.getLineNumber() - 1;
  var col = callsite.getColumnNumber() - 1;
  var src = getScript(file);
  line = src.split('\n')[line].slice(col);
  return line.match(/assert\((.*)\)/)[1].trim();
}

/**
 * Load contents of `script`.
 *
 * @param {String} script
 * @return {String}
 * @api private
 */

function getScript(script) {
  var xhr = new XMLHttpRequest;
  xhr.open('GET', script, false);
  xhr.send(null);
  return xhr.responseText;
}