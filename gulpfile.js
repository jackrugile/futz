const autoprefixer = require('autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sequence = require('run-sequence');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webserver = require('gulp-webserver');

gulp.task('build-css', () => {
  return sequence(
    'clean-dist-css',
    'build-css-src',
    'build-css-min'
  );
});

gulp.task('clean-dist-css', () => {
  return del.sync([
    './dist/*.css',
    './dist/*.css.map'
  ],{ force: true });
});

gulp.task('build-css-src', () => {
  let plugins = [
      autoprefixer({browsers: ['last 1 version']})
  ];
  return gulp.src('./src/css/*.css')
    .pipe(rename('futz.css'))
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-css-min', () => {
  let plugins = [
      autoprefixer({browsers: ['last 1 version']}),
      cssnano()
  ];
  return gulp.src('./src/css/*.css')
    .pipe(rename('futz.min.css'))
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-js', () => {
  return sequence(
    'clean-dist-js',
    'build-js-src',
    'build-js-min'
  );
});

gulp.task('clean-dist-js', () => {
  return del.sync([
    './dist/*.js',
    './dist/*.js.map'
  ],{ force: true });
});

gulp.task('build-js-src', () => {
  browserify({
    entries: './src/js/index.js',
    debug: true,
    standalone: 'Futz'
  })
  .transform('babelify', { presets: ['env'] })
  .bundle()
  .on('error', err => {
    gutil.log("Browserify Error", gutil.colors.red(err.message))
  })
  .pipe(source('futz.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build-js-min', () => {
  browserify({
    entries: './src/js/index.js',
    debug: true,
    standalone: 'Futz'
  })
  .transform('babelify', { presets: ['env'] })
  .bundle()
  .on('error', err => {
    gutil.log("Browserify Error", gutil.colors.red(err.message))
  })
  .pipe(source('futz.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('serve', () => {
  gulp.src('./')
    .pipe(webserver({
      'host': '0.0.0.0',
      'fallback': './demo/index.html',
      'livereload': true,
      'open': true,
      'port': '4000'
    }));
});

gulp.task('watch', ['build-css', 'build-js', 'serve'], () => {
  gulp.watch('./src/css/**/*.css', ['build-css']);
  gulp.watch('./src/js/**/*.js', ['build-js']);
});

gulp.task('default', ['watch']);