// src and dest are for moving files
// watch is for Gulp to trigger tasks anytime the watched files are modified
// task is to register a task in Gulp
const { src, dest, watch, task } = require('gulp');

// bro is for browserify
const bro = require('gulp-bro');

// browserSync
const browserSync = require('browser-sync').create();

// our build function
function _build() {
    // take every commonJS module, browserify them and put them into ./dist
    src('./src/cjs-modules/*.js')
        .pipe(bro())
        .pipe(dest('./dist'));

    // take every JS script, and put them into ./dist
    src('./src/scripts/**/*.js')
        .pipe(dest('./dist'));

    // take every HTML and CSS and put them into ./dist
    src(['./src/**/*.html', './src/**/*.css'])
        .pipe(dest('./dist'));
}

// our watch function
function _watch() {
    watch(['src/*/*.js', 'src/**/*.html'], _build);
    watch(['src/*/*.js', 'src/**/*.html']).on('change', browserSync.reload);
}

// our serve function
function _serve() {
    _build();
    browserSync.init({
        server: "./dist"
    });

    _watch();
}

// registering a 'serve' task so we can trigger the building and serving with
// gulp serve
task('serve', _serve);