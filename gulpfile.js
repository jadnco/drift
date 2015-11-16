var gulp        = require('gulp'),
    del         = require('del'),
    util        = require('gulp-util'),
    sass        = require('gulp-sass'),
    prefixer    = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    handlebars  = require('gulp-compile-handlebars'),
    browserSync = require('browser-sync'),
    ghPages     = require('gulp-gh-pages'),
    sassGlob    = require('gulp-sass-bulk-import'),
    markdown    = require('gulp-markdown'),
    watch       = require('gulp-watch');

var paths = {
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
  }
}.init();

gulp.task('serve', function() {
  browserSync.init({
    server: paths.dist.root,
    ui: false,
    open: false,
    notify: false,
    online: false
  });
});

gulp.task('styles', function() {
  gulp.src([paths.src.sass])
    .pipe(sassGlob())
    .on('error', util.log)
    .pipe(sass({
      includePaths: ['src/scss']
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
gulp.task('scripts', function() {
  gulp.src(paths.src._js)
    .pipe(concat('bundle.js'))
    .on('error', util.log)
    .pipe(uglify())
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.javascript));

  gulp.src(paths.src.js)
    .on('error', util.log)
    .pipe(uglify())
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.javascript));

  /*
  * Uglify JS libs and move to dist folder
  */
  gulp.src([paths.src.libs])
    .pipe(uglify())
    .on('error', util.log)
    .pipe(rename({
      suffix: '.min'
    }))
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.libs));
});

gulp.task('images', function() {
  gulp.src([paths.src.images])
    .pipe(gulp.dest(paths.dist.images));
});

gulp.task('clean:images', function(a) {
  del([paths.dist.images], a);
});

gulp.task('files', function() {
  gulp.src([paths.src.files])
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('clean:files', function(a) {
  del([paths.dist.root + '/*.{html,txt}'], a);
});

gulp.task('distribute', function() {
  // TODO: Take all files, minify and stick them in ./dist
});

watch(paths.src.root + '/scripts/**/*.js', function() {
  console.log('scripts started');
  gulp.start('scripts');
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch(paths.src.javascript, ['scripts']);
  gulp.watch(paths.src.files, ['clean:files', 'files']);
  gulp.watch(paths.src.images, ['clean:images', 'images']);
});

gulp.task('deploy', function() {
  return gulp.src([paths.dist.root + '/**/*'])
    .pipe(ghPages());
});

gulp.task('default', ['watch', 'serve', 'images', 'files', 'styles', 'scripts']);