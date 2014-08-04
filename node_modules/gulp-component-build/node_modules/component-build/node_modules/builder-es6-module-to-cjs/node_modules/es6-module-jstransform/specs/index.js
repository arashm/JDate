var path          = require('path');
var fs            = require('fs');
var assert        = require('assert');
var baseTransform = require('../index');
var classVisitors = require('jstransform/visitors/es6-class-visitors').visitorList;

function transform(code, options) {
  return baseTransform(code, options, classVisitors);
}

describe('es6-module-jstransform', function() {

  beforeEach(function() {
    baseTransform.__resetModuleState();
  });

  it('generates sourceMap', function() {
    var result = transform('export * from "jquery"', {
      sourceMap: true,
      filename: 'in.js'
    });
    assert.ok(result.code);
    assert.ok(result.sourceMap);
    assert.ok(result.sourceMapFilename);
  });

  fs.readdirSync(path.join(__dirname, 'cases')).forEach(function(p) {
    if (/\.result\.js$/.exec(p))
      return;

    p = path.join(__dirname, 'cases', p);

    it('transform ' + path.basename(p), function() {

      var code = fs.readFileSync(p, 'utf8');
      var result = fs.readFileSync(p.replace(/\.js$/, '.result.js'), 'utf8');
      assert.equal(result.trim(), transform(code).code.trim());
    });
  });
});
