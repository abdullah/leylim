/* eslint-disable */
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var image = require('gulp-image');
var { spawn } = require('child_process');
var rollup = require('rollup');
var rollupConfig = require('./rollup.config.js');
var browserSync = require('browser-sync').create();

gulp.task('image', function() {
  gulp
    .src('./lib/assets/component-thumbnail/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/assets/component-images'));
});

gulp.task('css', function() {
  return gulp.src('./lib/**/*.css').pipe(postcss()).pipe(gulp.dest('./dist'));
});

gulp.task('bundle-component', function() {
  const ls = spawn('scripts/bundle-component.sh');
  ls.stdout.on('data', data => {
    console.log(`bundle--: ${data}`);
  });
});

gulp.task('build', async function() {
  const bundle = await rollup.rollup(rollupConfig.io);
  await bundle.write(rollupConfig.op);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    port: 5000,
    server: {
      baseDir: './'
    },
    files: ['./dist']
  });
});

gulp.task(
  'watch',
  ['build', 'image', 'css', 'bundle-component', 'browser-sync'],
  done => {
    gulp.watch('./lib/**/*.css', ['css']);
    gulp.watch('./lib/*.js', ['build']);
    gulp.watch('./lib/assets/component-thumbnail/*', ['image']);
    gulp.watch(
      ['./lib/components/*.js', './lib/plugins/*.js'],
      ['bundle-component']
    );
    browserSync.reload();
    done();
  }
);

if (process.env.NODE_ENV !== 'production') {
  gulp.task('default', ['watch']);
} else {
  gulp.task('default', ['build', 'image', 'css', 'bundle-component']);
}
