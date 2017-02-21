'use strict';

const gulp = require('gulp');
const lint = require('gulp-eslint');

gulp.task('linter', function() {
  return gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(lint())
  .pipe(lint.format())
  .pipe(lint.failAfterError());
});

gulp.task('default', ['linter']);
