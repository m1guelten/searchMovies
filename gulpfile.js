const { src, dest, task, watch, series, parallel } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('autoprefixer');

const PATH = {
  scssRoot: 'assets/scss/style.scss',
  cssFolder: 'assets/css',
  scssFiles: 'assets/scss/**/*.scss',
  scssFolder: 'assets/scss',
  htmlFiles: '*.html',
  jsFiles: 'assets/js/**/*.js',
};

const PLUGINS = [
  autoprefixer({
    overrideBrowserslist: ['last 5 versions', '> 1%'],
    cascade: true,
  }),
];
function scss() {
  return src(PATH.scssRoot)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(PLUGINS))
    .pipe(csscomb())
    .pipe(dest(PATH.cssFolder))
    .pipe(browserSync.stream());
}

function scssMin() {
  const pluginsExtended = [...PLUGINS, cssnano({ preset: 'default' })];
  return src(PATH.scssRoot)
    .pipe(sass().on('error', sass.logError))
    .pipe(csscomb())
    .pipe(postcss(pluginsExtended))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(PATH.cssFolder))
    .pipe(browserSync.stream());
}
function comb() {
  return src(PATH.scssFiles).pipe(csscomb()).pipe(dest(PATH.scssFolder));
}

function syncInit() {
  browserSync.init({
    server: { baseDir: './' },
  });
}
async function sync() {
  browserSync.reload();
}
function watchFiles() {
  syncInit();
  watch(PATH.scssFiles, scss);
  watch(PATH.htmlFiles, sync);
  watch(PATH.jsFiles, sync);
}

task('scss', scss);
task('watch', watchFiles);
task('min', scssMin);
task('comb', comb);
