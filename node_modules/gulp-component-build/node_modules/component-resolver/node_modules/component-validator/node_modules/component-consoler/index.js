
var debug = require('debug')('component-consoler');

/**
 * Error types where we show the stack trace.
 * These are generally user errors,
 * not "our" errors.
 */

var showstack = [
  'ParseError',
  'SyntaxError',
  'URIError',
];

/**
 * Output fatal error message and exit.
 * Depending on the error type, show the stack trace.
 *
 * @param {String} msg
 * @api private
 */


exports.fatal = function(err){
  if (err instanceof Error) {
    debug(err.stack);
    if (err.stack && ~showstack.indexOf(err.name)) {
      err = err.stack;
    } else {
      err = err.message;
    }
  }
  console.error();
  exports.error(err);
  console.error();
  process.exit(1);
};

/**
 * Log the given `type` with `msg`.
 *
 * @param {String} type
 * @param {String} msg
 * @api public
 */

exports.log = function(type, msg, color){
  color = color || '36';
  var w = 10;
  var len = Math.max(0, w - type.length);
  var pad = Array(len + 1).join(' ');
  console.log('  \033[' + color + 'm%s\033[m : \033[90m%s\033[m', pad + type, msg);
};

/**
 * Log warning message with `type` and `msg`.
 *
 * @param {String} type
 * @param {String} msg
 * @api public
 */

exports.warn = function(type, msg){
  exports.log(type, msg, '33');
};

/**
 * Output error message.
 *
 * @param {String} msg
 * @api private
 */

exports.error = function(msg){
  var w = 10;
  var type = 'error';
  var len = Math.max(0, w - type.length);
  var pad = Array(len + 1).join(' ');
  console.error('  \033[31m%s\033[m : \033[90m%s\033[m', pad + type, msg);
};
