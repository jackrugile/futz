const autoprefixer = require('autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const jsdoc = require('gulp-jsdoc3');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sequence = require('run-sequence');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webserver = require('gulp-webserver');

gulp.task('build', () => {
  return sequence(
    'build-css',
    'build-js'
  );
});

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
    './dist/sourcemaps/*.css.map'
  ],{ force: true });
});

gulp.task('build-css-src', () => {
  let plugins = [
    autoprefixer({browsers: ['last 1 version']})
  ];
  return gulp.src('./src/css/*.css')
    .pipe(rename('variaboard.css'))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-css-min', () => {
  let plugins = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
  ];
  return gulp.src('./src/css/*.css')
    .pipe(rename('variaboard.min.css'))
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist'))
    .pipe(sourcemaps.write('./sourcemaps'))
    .pipe(gulp.dest('./docs/css'));
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
    './dist/sourcemaps/*.js.map'
  ],{ force: true });
});

gulp.task('build-js-src', () => {
  browserify({
    entries: './src/js/index.js',
    debug: false,
    standalone: 'VariaBoard'
  })
  .transform('babelify', { presets: ['env'] })
  .bundle()
  .on('error', err => {
    gutil.log("Browserify Error", gutil.colors.red(err.message))
  })
  .pipe(source('variaboard.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./dist'));
});

gulp.task('build-js-min', () => {
  browserify({
    entries: './src/js/index.js',
    debug: false,
    standalone: 'VariaBoard'
  })
  .transform('babelify', { presets: ['env'] })
  .bundle()
  .on('error', err => {
    gutil.log("Browserify Error", gutil.colors.red(err.message))
  })
  .pipe(source('variaboard.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./dist'))
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./sourcemaps'))
  .pipe(gulp.dest('./docs/js'));
});

gulp.task('docs', () => {
  return sequence(
    'clean-docs',
    'build-docs'
  );
});

gulp.task('clean-docs', () => {
  return del.sync([
    './docs/jsdoc'
  ], { force: true });
});

gulp.task('build-docs', function (cb) {
  let config = require('./jsdoc.json');
  gulp.src(['./README.md', './src/js/**/*.js'], { read: false })
    .pipe(jsdoc(config, cb));
});

gulp.task('serve', () => {
  gulp.src('./docs')
    .pipe(webserver({
      'host': '0.0.0.0',
      'fallback': './index.html',
      'livereload': true,
      'open': true,
      'port': '4000'
    }));
});

gulp.task('watch', ['build', 'serve'], () => {
  gulp.watch('./src/css/**/*.css', ['build-css']);
  gulp.watch('./src/js/**/*.js', ['build-js']);
});

gulp.task('default', ['watch']);
