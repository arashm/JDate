
/**
 * This is super basic and only reads the CSS.
 * You probably want URL rewriter and autoprefixer or something.
 */

module.exports = function () {
  return function css(file) {
    if (file.extension !== 'css') return;
    file.string = true;
  }
}
