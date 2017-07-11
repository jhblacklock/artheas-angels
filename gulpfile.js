var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var merge2 = require('merge2');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var imageop = require('gulp-image-optimization');


gulp.task('copy-assets', function() {
    gulp.src('./bower_components/bootstrap-sass/assets/javascripts/*.js')
       .pipe(gulp.dest('./src/js'));
    gulp.src('./bower_components/bootstrap-sass/assets/fonts/bootstrap/*.{ttf,woff,eof,svg,woff2}')
        .pipe(gulp.dest('./src/fonts'));
    gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg,woff2}')
        .pipe(gulp.dest('./src/fonts'));
    gulp.src('./bower_components/jquery/dist/*.js')
        .pipe(gulp.dest('./src/js'));
    gulp.src('./bower_components/owl.carousel/dist/*.js')
        .pipe(gulp.dest('./src/js'));
    gulp.src('.bower_components/skrollr/src/*.js')
        .pipe(gulp.dest('./src/js'));
    gulp.src('./bower_components/skrollr/dist/*.js')
        .pipe(gulp.dest('./src/js'));
    gulp.src('./bower_components/smoothScroll/*.js')
        .pipe(gulp.dest('./src/js'));
    gulp.src('./bower_components/bootstrap-validator/dist/*.js')
        .pipe(gulp.dest('./src/js'));
    gulp.src('./bower_components/wow/dist/*.js')
        .pipe(gulp.dest('./src/js'));
    gulp.src('./bower_components/animate.css/*.css')
        .pipe(gulp.dest('./src/css'));

});

gulp.task('sass', function () {
    gulp.src('./src/sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('minifycss', ['cleancss'], function(){
  return gulp.src('./src/css/*.css')
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./src/css/'));
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/css/theme.css', ['minifycss']);
});

gulp.task('cleancss', function() {
  return gulp.src('./src/css/*.min.css', { read: false }) // much faster 
    .pipe(ignore('theme.css'))
    .pipe(rimraf());
});

gulp.task('cleandist', ['minifycss'],  function() {
  return gulp.src('./dist/', { read: false }) // much faster 
    .pipe(rimraf());
});

// @task dist moves all js, css, img and fonts to dist folder and minifies css
gulp.task('dist', ['cleandist'], function(){
    gulp.src('./src/fonts/*.{ttf,woff,eof,svg, woff2}')
        .pipe(gulp.dest('./dist/fonts'));

    gulp.src('./src/vid/*.*')
        .pipe(gulp.dest('./dist/vid'));

    gulp.src('./src/img/*.{jpg,jepg,png,svg,gif}')
        .pipe(gulp.dest('./dist/img'));

    gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./dist/css'));

        gulp.src('./src/php/*.php')
        .pipe(gulp.dest('./dist/php'));

    gulp.src('./src/*.{html,ico}')
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/js/*.min.js')
        .pipe(gulp.dest('./dist/js'));

    gulp.src(['src/img/*.png','src/img/*.jpg','src/img/*.gif','src/img/*.jpeg']).pipe(imageop({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('dist/img'));

});








