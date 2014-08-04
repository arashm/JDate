// Load plugins
var gulp         = require('gulp'),
    component    = require('gulp-component-build'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    //jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    clean        = require('gulp-clean'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache');
    //livereload   = require('gulp-livereload');

// Scripts
gulp.task('scripts', function() {
  return gulp.src('component.json')
    .pipe(component.scripts())
    .pipe(rename('jdate.js'))
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(gulp.dest('build'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['build'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('scripts');
});

// Watch
gulp.task('watch', function() {
  // Watch .js files
  gulp.watch('lib/*.js', ['scripts']);

  // Create LiveReload server
  //var server = livereload();

  // Watch any files in dist/, reload on change
  //gulp.watch(['dist/**']).on('change', function(file) {
    //server.changed(file.path);
  //});

});

