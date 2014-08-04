var gulp = require('gulp');
var rename = require('gulp-rename');
var component = require('./index');

gulp.task('build:scripts', function() {
  gulp.src('test/fixtures/success-component/component.json')
    .pipe(component.scripts({ install: true }))
    .pipe(rename('components.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('build:styles', function() {
  gulp.src('test/fixtures/success-component/component.json')
    .pipe(component.styles({ install: true }, function(styles, option) {
      styles.use('styles', require('component-builder-less')({}));
    }))
    .pipe(rename('components.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('build:files', function() {
  gulp.src('test/fixtures/success-component/component.json')
    .pipe(component.files({
      install: true,
      destination: 'public/img'
    }, function(files, option) {
      // add to copy ext if you want.
      files.fns.images.forEach(function(fn) {
        files.use('some-ext', fn);
        // files.use('some-ext1', fn);
        // files.use('some-ext2', fn);
        // .
        // .
        // .
      });
    }));
});

gulp.task('default', ['build:scripts', 'build:styles', 'build:files']);
