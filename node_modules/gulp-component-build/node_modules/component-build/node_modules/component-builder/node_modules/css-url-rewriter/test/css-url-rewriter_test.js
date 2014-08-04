'use strict';

var SAVE = true;

var fs = require('fs'),
    path = require('path'),
    rewriteCSSURLs = require('../lib/css-url-rewriter.js'),
    files = [];

module.exports = {
  'rewriteCSSURLs function': {
    setUp: function(done) {
      if (!fs.existsSync(path.join(__dirname, 'results')))
        fs.mkdirSync(path.join(__dirname, 'results'));

      fs.readdir(path.join(__dirname, 'fixtures'), function (err, _files) {
        files = _files || [];
        done();
      });
    },

    'compare files': function(test) {
      test.expect(files.length);

      var rewrite = function (url) {
        return '_' + url;
      };

      for (var i = 0; i < files.length; i++) {
        var basename = path.join(files[i]),
            fixtureFile = path.join(__dirname, 'fixtures', basename),
            fixture = fs.readFileSync(fixtureFile).toString(),
            expectedFile = path.join(__dirname, 'expected', basename),
            expected = fs.readFileSync(expectedFile).toString();

        var result = rewriteCSSURLs(fixture, rewrite);
        if (SAVE)
          fs.writeFileSync(path.join(__dirname, 'results', basename), result);

        test.strictEqual(result, expected, basename);
      }

      test.done();
    }
  }
};
