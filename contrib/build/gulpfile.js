var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
const filter = require('gulp-filter');

var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
const minify = require("gulp-minify");
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');

let cleanCSS = require('gulp-clean-css');
//var uglify = require('gulp-uglify');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS_SRC: '../../css/**/*.css',
  CSS_DST: '../../css/',
  IMAGES_SRC: '../../images/**/*.*',
  IMAGES_DST: '../../images/',
  PORTFOLIO_SRC: '../../images/portfolio-images/**/*.*',
  PORTFOLIO_DST: '../../images/portfolio-images/',
  JS_SRC: '../../js/**/*.js',
  JS_DST: '../../js/'
};
gulp.task('createThumbnails', function() {
  const filterThumb = filter(function (file) {
    let baseName = file.path ;
    return !baseName.includes('_th.');
  });
  return gulp.src(Paths.PORTFOLIO_SRC)
        .pipe(filterThumb)
        .pipe(imageResize({width : 365, height : 245, crop: true }))
        .pipe(rename(function (path) { path.basename += "_th"; }))
      .pipe(gulp.dest(Paths.PORTFOLIO_DST));
});
gulp.task('minifyJS', function() {
  return gulp.src(Paths.JS_SRC)
    .pipe(minify())
    .pipe(gulp.dest(Paths.JS_DST))
});
gulp.task('minifyCSS', () => {
  return gulp.src(Paths.CSS_SRC)
    .pipe(cleanCSS())
    .pipe(gulp.dest(Paths.CSS_DST));
});
gulp.task('minifyIMG', function() {
  return gulp.src(Paths.IMAGES_SRC)
        .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imageminJpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 7}),
          imagemin.svgo({
              plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: false}
              ]
          })
      ],{ verbose: true }))
      .pipe(gulp.dest(Paths.IMAGES_DST));
});
//
//gulp.task('minifyJS', function() {
//  return gulp.src('../../frontend/web/js/**/*.js')
//    .pipe(minify({ext:{ min:'.min.js' },ignoreFiles: ['*min.js']}))
//    .pipe(gulp.dest('../../frontend/web/js'));
//});
//
//gulp.task('minifyCSS', function() {
//  return gulp.src('../../frontend/web/css/**/*.css')
//    .pipe(cleanCSS())
//    .pipe(gulp.dest(Paths.CSS));
//});
//
//gulp.task('compile', function() {
//  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
//    .pipe(sourcemaps.init())
//    .pipe(sass().on('error', sass.logError))
//    .pipe(autoprefixer())
//    .pipe(cleanCSS())
//    .pipe(sourcemaps.write(Paths.HERE))
//    .pipe(gulp.dest(Paths.CSS));
//});
//gulp.task('all', function() {
//    gulp.start('compile');
//    gulp.start('minifyJS');
//    gulp.start('createMiniIMG');
//    gulp.start('minifyIMG');
//});
//
//gulp.task('watch', function() {
//    gulp.start('compile').start('minifyJS').start('minifyIMG').watch(Paths.SCSS, ['compile']);
//});
//
//gulp.task('open', function() {
//  gulp.src('examples/dashboard.html')
//    .pipe(open());
//});
//
//gulp.task('open-app', ['open', 'watch']);
