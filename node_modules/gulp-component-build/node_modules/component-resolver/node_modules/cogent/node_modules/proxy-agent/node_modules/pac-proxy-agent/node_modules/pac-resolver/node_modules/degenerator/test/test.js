
/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var degenerator = require('../');

describe('degenerator()', function () {

  describe('"expected" fixture tests', function () {

    fs.readdirSync(__dirname).forEach(function (n) {
      if ('test.js' == n) return;
      if (/\.expected\.js$/.test(n)) return;
      var expectedName = path.basename(n, '.js') + '.expected.js';
      it(n + ' → ' + expectedName, function () {
        var js = fs.readFileSync(path.resolve(__dirname, n), 'utf8');
        var expected = fs.readFileSync(path.resolve(__dirname, expectedName), 'utf8');
        var compiled = degenerator(js, [ /./ ]);
        assert.equal(expected.trim(), compiled.trim());
      });
    });

  });

});
