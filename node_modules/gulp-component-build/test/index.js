var File = require('gulp-util').File;
var component = require('../');
var assert = require('assert');

describe('success case', function() {
  it('scripts', function(done) {
    var stream = component.scripts();
    stream.on('data', function(file) {
      var contents = file.contents.toString().replace(/\r|\n/g, '');
      assert.ok(contents.match(/require\.register/));
      assert.ok(contents.match(/function.*Test.*{/));
      done();
    });
    stream.write(new File({
      cwd: __dirname,
      path: __dirname + '/fixtures/success-component/component.json',
      contents: new Buffer('')
    }));
    stream.end();
  });

  it('styles', function(done) {
    var stream = component.styles({}, function(styles, option) {
      styles.use('styles', require('component-builder-less')({}));
    });
    stream.on('data', function(file) {
      var contents = file.contents.toString().replace(/\r|\n/g, '');
      assert.ok(contents.match(/body\s*{\s*margin: 0;\s*}/));
      done();
    });
    stream.write(new File({
      cwd: __dirname,
      path: __dirname + '/fixtures/success-component/component.json',
      contents: new Buffer('')
    }));
    stream.end();
  });

  it('files', function(done) {
    var stream = component.files({}, function(build, option) {
      build.fns.images.forEach(function(fn) {
        build.use('some-ext', fn);
      });
    });
    stream.on('end', function() {
      done();
    });
    stream.write(new File({
      cwd: __dirname,
      path: __dirname + '/fixtures/success-component/component.json',
      contents: new Buffer('')
    }));
    stream.end();
  });
});

describe('failure case', function() {
  it('scripts', function(done) {
    var stream = component.scripts();
    stream.on('error', function(err) {
      assert.equal(err.message, 'failed to read "failure-component"\'s file "index.js"');
      done();
    });
    stream.write(new File({
      cwd: __dirname,
      path: __dirname + '/fixtures/failure-component/component.json',
      contents: new Buffer('')
    }));
    stream.end();
  });

  it('styles', function(done) {
    var stream = component.styles({}, function(styles, option) {
      styles.use('styles', require('component-builder-less')({}));
    });
    stream.on('error', function(err) {
      assert.equal(err.message, 'failed to read "failure-component"\'s file "index.css"');
      done();
    });
    stream.write(new File({
      cwd: __dirname,
      path: __dirname + '/fixtures/failure-component/component.json',
      contents: new Buffer('')
    }));
    stream.end();
  });

  it('files', function(done) {
    var stream = component.files({}, function(build, option) {
      build.fns.images.forEach(function(fn) {
        build.use('some-ext', fn);
      });
    });
    stream.on('error', function(err) {
      assert.ok(err.message.match(/index..*?\" does not exist/));
      done();
    });
    stream.write(new File({
      cwd: __dirname,
      path: __dirname + '/fixtures/failure-component/component.json',
      contents: new Buffer('')
    }));
    stream.end();
  });

});

