'use strict';

var gulp     = require('gulp');
var connect  = require('gulp-connect');
var uglify   = require('gulp-uglify');
var bytediff = require('gulp-bytediff');
var plumber  = require('gulp-plumber');

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('uglify', function() {
  gulp.src('src/1k.js')
    .pipe(plumber())
    .pipe(bytediff.start())
    .pipe(uglify())
    .pipe(bytediff.stop())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['uglify']);
});

gulp.task('default', ['uglify', 'webserver', 'watch']);