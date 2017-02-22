/* eslint-env node */

'use strict';

// Configuration.

var config = {};
config.sass = {
  srcFiles: [
    './dist/sass/*.scss'
  ],
  watchFiles: [
    './dist/sass/**/*.scss',
    './dist/_patterns/**/*.scss'
  ],
  options: {
    includePaths: [
      './dist/sass',
      './node_modules/shila-css',
      './node_modules/breakpoint-sass/stylesheets',
      './node_modules/sass-toolkit/stylesheets',
      './node_modules/singularitygs/stylesheets'
    ],
    outputStyle: 'expanded'
  },
  destDir: './dist/css'
};

// Load Gulp and other tools.

var gulp = require('gulp');
var sass = require('gulp-sass');

// Gulp tasks.

/**
 * Compiles Sass files.
 */
gulp.task('sass', function () {
  return gulp.src(config.sass.srcFiles)
    .pipe(sass(config.sass.options).on('error', sass.logError))
    .pipe(gulp.dest(config.sass.destDir));
});

/**
 * Gulp default task.
 */
gulp.task('default', ['sass']);
