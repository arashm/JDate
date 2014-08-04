
var resolve = require('path').resolve;

var Builder = require('./builder');

module.exports = Files;

// Files inherits the Builder's prototype methods,
// but it only uses a subset of them.
Builder.extend(Files);

function Files(branches, options) {
  if (!(this instanceof Files)) return new Files(branches, options);

  options = options || {};
  this.initialize(branches, options);

  this.destination = resolve(this.root, options.destination || 'build')
  // channel does not return anything
  this.channel.discard = true;
}
