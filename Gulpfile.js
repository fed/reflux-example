const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const webserver = require('gulp-webserver');

gulp.task('html', () => {
  return gulp.src('src/{,**/}*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('assets', () => {
  return gulp.src('src/assets/{,**/}*.*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('bundle', () => {
  return browserify({
      entries: 'src/js/app.js',
      extensions: ['.jsx', '.js'],
      debug: true
    })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', () => {
  gulp.src('src/css/app.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('webserver', () => {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      port: 6789
    }));
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.{jsx,js}', ['bundle']);
  gulp.watch('src/css/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
});

gulp.task('build', ['bundle', 'sass', 'html', 'assets']);
gulp.task('default', ['build', 'webserver', 'watch']);
