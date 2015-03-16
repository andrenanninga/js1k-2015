'use strict';

var fs          = require('fs');
var runSequence = require('run-sequence');

var gulp        = require('gulp');
var connect     = require('gulp-connect');
var uglify      = require('gulp-uglify');
var plumber     = require('gulp-plumber');
var run         = require('gulp-run');
var rename      = require('gulp-rename');
var size        = require('gulp-size');
var htmlReplace = require('gulp-html-replace');

gulp.task('webserver', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('uglify', function() {
  return gulp.src('src/1k.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('1k.uglify.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('regpack', function() {
  return gulp.src('.')
    .pipe(plumber())
    .pipe(run('node lib/regpack.js build/1k.uglify.js', { verbosity: 0 }))
    .pipe(rename('1k.regpack.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('shim', function() {
  return gulp.src('src/shim.html')
    .pipe(plumber())
    .pipe(htmlReplace({
      regpack: '<script type="demo">' + fs.readFileSync('build/1k.regpack.js') + '</script>'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('index', function() {
  return gulp.src('src/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('build'));
});

gulp.task('size', function() {
  return gulp.src(['build/*.js', 'src/1k.js'])
    .pipe(size({ showFiles: true }));
});

gulp.task('reload', function() {
  return gulp.src('build/*.*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/*.*', ['build']);
});

gulp.task('build', function() {
  runSequence(
    'uglify',
    'regpack',
    'size',
    'index',
    'shim',
    'reload'
  );
});

gulp.task('default', ['build', 'webserver', 'watch']);