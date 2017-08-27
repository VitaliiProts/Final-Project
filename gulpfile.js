var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var sync = require('browser-sync').create();
var htmlExtend = require('gulp-html-extend');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var del = require('del');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');


gulp.task('html', function () {
    return gulp.src('src/pages/*.html')
        .pipe(htmlExtend())
        .pipe(gulp.dest('dist'));
});

gulp.task('css:app', function () {
    return gulp.src('src/styles/app.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssnano())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(sync.stream())
});

gulp.task('css:vendor', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(concat('vendor.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(sync.stream())
});

gulp.task('js:app', function () {
    return gulp.src('src/js/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('json', function () {
    return gulp.src('src/js/data.json')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('js:vendor', function () {
    return gulp.src([
        "node_modules/jquery/dist/jquery.js",
        "node_modules/bootstrap/dist/js/bootstrap.js",
        "node_modules/magnific-popup/dist/jquery.magnific-popup.min.js",
        "node_modules/jquery-validation/dist/jquery.validate.min.js",
        "node_modules/slideout/dist/slideout.min.js"
        // "src/js/*.js"
    ])
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('fonts:app', function () {
    return gulp.src('src/fonts/**/*.{ttf,otf}')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('fonts:vendor', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}',
        'node_modules/font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}'
    ])
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('img', function () {
    return gulp.src('src/images/*.{png,svg,jpg}')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('del', function () {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('css', ['css:app', 'css:vendor']);
gulp.task('js', ['js:app', 'js:vendor', 'json']);
gulp.task('assets', ['fonts:app', 'fonts:vendor', 'img']);

gulp.task('build', ['del', 'html', 'css', 'js', 'assets']);

gulp.task('watch', ['build'], function () {
    sync.init({
        server: 'dist',
        notify: false
    });

    gulp.watch('src/styles/**/*.less', ['css:app']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.js', ['js']);

    gulp.watch('dist/*.html').on('change', sync.reload);
    gulp.watch('dist/**/*.js').on('change', sync.reload);
});


gulp.task('default', ['build', 'watch']);