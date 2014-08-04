var resolve = require('url').resolve;
var rewriteCSSURLs = require('css-url-rewriter');

var utils = require('../utils');

module.exports = function (prefix, options) {
  if (typeof prefix === 'object') {
    options = prefix;
    prefix = null;
  }

  options = options || {};
  prefix = prefix
    || options.prefix
    || '';

  return function rewriteUrl(file, done) {
    if (file.extension !== 'css') return done();

    file.read(function (err, string) {
      if (err) return done(err);
      prefix = prefix || '';
      var branch = file.branch;

      // rewrite URLs
      file.string = rewriteCSSURLs(string, function (uri) {
        if (isData(uri)) return uri;
        if (isAbsolute(uri)) return uri;
        uri = resolve(file.path, uri);
        uri = resolve(prefix + utils.rewriteUrl(branch) + '/', uri);
        return uri;
      });

      done();
    })
  }
}

/**
 * Check if a URL is a data url.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

 function isData(url) {
  return 0 === url.indexOf('data:');
}

/**
 * Check if a URL is an absolute url.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

function isAbsolute(url) {
  return ~url.indexOf('://')
    || '/' === url[0];
}
