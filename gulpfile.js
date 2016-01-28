'use strict';

const gulp        = require('gulp');
const del         = require('del');
const util        = require('gulp-util');
const sass        = require('gulp-sass');
const prefixer    = require('gulp-autoprefixer');
const uglify      = require('gulp-uglify');
const concat      = require('gulp-concat');
const rename      = require('gulp-rename');
const handlebars  = require('gulp-compile-handlebars');
const browserSync = require('browser-sync');
const ghPages     = require('gulp-gh-pages');
const sassGlob    = require('gulp-sass-bulk-import');
const markdown    = require('gulp-markdown');
const watch       = require('gulp-watch');

let paths = {
  src: { root: 'src' },
  dist: { root: 'dist' },
  init: function() {
    this.src.sass        = this.src.root + '/scss/main.scss';
    this.src.js          = [this.src.root + '/scripts/**/*.js', '!' + this.src.root + '/scripts/**/_*.js', '!' + this.src.root + '/scripts/libs/*.js'];
    this.src._js         = [this.src.root + '/scripts/**/_*.js'];
    this.src.libs        = this.src.root + '/scripts/libs/*.js';
    this.src.images      = this.src.root + '/images/**/*.{jpg,jpeg,svg,png,gif}';
    this.src.files       = this.src.root + '/*.{html,txt}';

    this.dist.css        = 'assets/css';
    this.dist.images     = 'assets/images';
    this.dist.javascript = 'assets/scripts';
    this.dist.libs       = 'assets/scripts/libs';

    return this;
  },
}.init();

gulp.task('serve', () => {
  browserSync.init({
    server: paths.dist.root,
    ui: false,
    open: false,
    notify: false,
    online: false,
  });
});

gulp.task('styles', () => {
  gulp.src([paths.src.sass])
    .pipe(sassGlob())
    .on('error', util.log)
    .pipe(sass({
      includePaths: ['src/scss'],
    }))
    .on('error', util.log)
    .pipe(prefixer('last 2 versions'))
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.reload({stream: true}));
});

/*
* Bundle all javascript files
*/
gulp.task('scripts', () => {
  gulp.src(paths.src._js)
    .pipe(concat('bundle.js'))
    .on('error', util.log)
    .pipe(uglify())
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.javascript));

  gulp.src(paths.src.js)
    .on('error', util.log)
    // .pipe(uglify())
    // .on('error', util.log)
    .pipe(gulp.dest(paths.dist.javascript));

  /*
  * Uglify JS libs and move to dist folder
  */
  gulp.src([paths.src.libs])
    .pipe(uglify())
    .on('error', util.log)
    .pipe(rename({
      suffix: '.min',
    }))
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.libs));
});

gulp.task('images', () => {
  gulp.src([paths.src.images])
    .pipe(gulp.dest(paths.dist.images));
});

gulp.task('clean:images', (a) => {
  del([paths.dist.images], a);
});

gulp.task('files', () => {
  gulp.src([paths.src.files])
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('clean:files', (cb) => {
  del([paths.dist.root + '/*.{html,txt}'], cb);
});

gulp.task('distribute', () => {
  // TODO: Take all files, minify and stick them in ./dist
});

watch(paths.src.root + '/scripts/**/*.js', () => {
  gulp.start('scripts');
});

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch(paths.src.javascript, ['scripts']);
  gulp.watch(paths.src.files, ['clean:files', 'files']);
  gulp.watch(paths.src.images, ['clean:images', 'images']);
});

gulp.task('deploy', () => {
  return gulp.src([paths.dist.root + '/**/*'])
    .pipe(ghPages());
});

gulp.task('default', ['watch', 'serve', 'images', 'files', 'styles', 'scripts']);
