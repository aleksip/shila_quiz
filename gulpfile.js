const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

function sassCompile() {
  return gulp.src('components/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: './node_modules/shila-css/sass'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('components/'));
}

exports.default = sassCompile;
