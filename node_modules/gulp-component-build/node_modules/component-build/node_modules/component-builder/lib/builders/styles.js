var Builder = require('./builder');

module.exports = Styles;

Builder.extend(Styles);

function Styles(branches, options) {
  if (!(this instanceof Styles)) return new Styles(branches, options);

  options = options || {};
  Builder.call(this, branches, options);
}

/**
 * The last middleware of every field.
 * Checks to see if the file is "used",
 * then appends it if it is.
 *
 * @param {Object} field
 * @param {Object} file
 * @return {String}
 * @api private
 */

Styles.prototype.append = function* (field, file) {
  yield* this.transform(field, file);
  // read file now if not already read
  if (file.string === true) file.string = yield file.read;
  if (!file.string) return '';
  return file.string + '\n\n';
}
