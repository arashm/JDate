/*
 * css-url-rewriter
 * https://github.com/callumlocke/css-url-rewriter
 *
 * Copyright (c) 2014 Callum Locke
 * Licensed under the MIT license.
 */

'use strict';
var extend = require('extend');

// Regex to find CSS properties that contain URLs
// Fiddle: http://refiddle.com/refiddles/css-url-matcher
// Railroad: http://goo.gl/LXpk52
var cssPropertyMatcher = /@import[^;]*|[;\s]?\*?[a-zA-Z\-]+\s*\:\#?[\s\S]*url\(\s*['"]?[^'"\)\s]+['"]?\s*\)[^;}]*/g;

// Regex to find the URLs within a CSS property value
// Fiddle: http://refiddle.com/refiddles/match-multiple-urls-within-a-css-property-value
// Railroad: http://goo.gl/vQzMcg
var urlMatcher = /url\(\s*['"]?([^)'"]+)['"]?\s*\)/g;

var defaults = {
  excludeProperties: ['behavior', '*behavior']
};

module.exports = function rewriteCSSURLs(css, settings, rewriterFn) {
  // Normalise arguments and settings
  if (typeof settings === 'function') {
    rewriterFn = settings;
    settings = {};
  }
  settings = extend({}, defaults, settings);

  // Return the modified CSS
  var result = css.toString().replace(cssPropertyMatcher, function(property, urlValue) {
    // This function deals with an individual CSS property.

    // If this property is excluded, return it unchanged
    if (settings.excludeProperties.length) {
      var propertyName = property.split(':')[0].replace(/^\s+|\s+$/g, '');

      for (var i = settings.excludeProperties.length - 1; i >= 0; i--) {
        if (propertyName.indexOf(settings.excludeProperties[i]) === 0) {
          return property;
        }
      }
    }

    // Return the property with the URL rewritten
    return property.replace(urlMatcher, function(urlFunc, justURL) {
      return urlFunc.replace(justURL, rewriterFn(justURL));
    });
  });

  return result;
};
