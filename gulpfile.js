/* eslint-disable */

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var image = require('gulp-image');
var { spawn } = require('child_process');

gulp.task('image', function () {
  gulp.src('./lib/assets/component-thumbnail/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/assets/component-images'));
});

gulp.task('css', function () {
  return gulp.src('./lib/assets/leylim.css')
    .pipe(postcss())
    .pipe(gulp.dest('./dist'));
});

gulp.task('bundle-component', function () {
  const ls = spawn('bin/bundle-component.sh');
  ls.stdout.on('data', (data) => {
    console.log(`bundle--: ${data}`);
  });
});

gulp.task('watch', ['image', 'css', 'bundle-component'], () => {
  gulp.watch('./lib/assets/leylim.css', ['css']);
  gulp.watch('./lib/assets/component-thumbnail/*', ['image']);
  gulp.watch('./lib/components/*', ['bundle-component']);
});

