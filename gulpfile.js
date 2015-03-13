'use strict';

var gulp        = require('gulp');
var connect     = require('gulp-connect');
var uglify      = require('gulp-uglify');
var plumber     = require('gulp-plumber');
var run         = require('gulp-run');
var rename      = require('gulp-rename');
var size        = require('gulp-size');

var runSequence = require('run-sequence');

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('uglify', function() {
  return gulp.src('src/1k.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('1k.uglify.js'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('regpack', function() {
  return gulp.src('.')
    .pipe(plumber())
    .pipe(run('node lib/regpack.js dist/1k.uglify.js', { verbosity: 0 }))
    .pipe(rename('1k.regpack.js'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('size', function() {
  return gulp.src('dist/*.js')
    .pipe(size({ showFiles: true }));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['build']);
});

gulp.task('build', function() {
  runSequence(
    'uglify',
    'regpack',
    'size'
  );
});

gulp.task('default', ['build', 'webserver', 'watch']);