gulp-component-build.
=======================

gulp plugin to build component.

Example
=======================
```js
var gulp = require('gulp');
var rename = require('gulp-rename');
var component = require('./index');

gulp.task('compile:scripts', function() {
  gulp.src('test/fixtures/success-component/component.json')
    .pipe(component.scripts({ install: true }))
    .pipe(rename('components.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('compile:styles', function() {
  gulp.src('test/fixtures/success-component/component.json')
    .pipe(component.styles({ install: true }, function(styles, option) {
      styles.use('styles', require('component-builder-less')({}));
    }))
    .pipe(rename('components.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('compile:files', function() {
  gulp.src('test/fixtures/success-component/component.json')
    .pipe(component.files({ install: true }, function(files, option) {
      // add to copy ext.
      build.fns.images.forEach(function(fn) {
        build.use('some-ext1', fn);
        build.use('some-ext2', fn);
      });
    }));
});

gulp.task('default', ['compile:scripts', 'compile:styles']);

```

api
-----------------------
### component.scripts(option, configureFunction) #=> stream.
- option
  - ```component/component-build```'s argument.
- configureFunction
  - first argument
    - ```component/component-builder2``` instance. can use to adding some plugins if you want.
  - second argument
    - ```option```.

### component.styles(option, configureFunction) #=> stream.
- same to ```component.scripts```

### component.files(option, configureFunction) #=> stream.
- same to ```component.scripts```

