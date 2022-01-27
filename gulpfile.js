const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');
const groupCssMediaQueries = require('gulp-group-css-media-queries');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const del = require('del')
const webpack = require('webpack-stream');
const htmlmin = require('gulp-htmlmin');
const webp = require('gulp-webp');

gulp.task('html', function(){
    return gulp.src('src/**/*.html')
    .pipe(plumber({errorHandler: notify.onError(function(err) {
        return {
            title: 'Html',
            message: err.message
        }
    })}))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
})

gulp.task('styles', function() {
    return gulp.src('src/css/styles.scss', {sourcemaps: true})
    .pipe(plumber({errorHandler: notify.onError(function(err) {
        return {
            title: 'Styles',
            message: err.message
        }
    })}))
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(groupCssMediaQueries())
    .pipe(autoPrefixer({
        grid: true,
        overrideBrowserslist: ['last 3 versions'],
        cascade: true
    }))
    .pipe(gulp.dest('public'))
    .pipe(cleanCss())
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
})

gulp.task('image', function() {
    return gulp.src('src/assets/**/*.{jpg, jpeg, png, gif, webp}')
    .pipe(plumber({errorHandler: notify.onError(function(err){
        return {
            title: 'image',
            message: err.message
        }
    })}))
    .pipe(newer('src/assets/**'))
    .pipe(webp())
    .pipe(gulp.dest('public/assets'))
    .pipe(gulp.src('src/assets/**/*.{jpg, jpeg, png, gif, webp}'))
    .pipe(newer('src/assets/**'))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
    }))
    .pipe(gulp.dest('public/assets'))
    .pipe(gulp.src('src/assets/**/*.svg'))
    .pipe(gulp.dest('public/assets'))
    .pipe(browserSync.stream())
})

gulp.task('reset', function() {
    return del('public')
})

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
    .pipe(webpack({
        output: {
            filename: 'app.min.js',
        }
    }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
})

gulp.task('server', function() {
    browserSync.init({
        server: 'public'
      })
})

gulp.task('watcher', function() {
    gulp.watch('src/**/*.html', gulp.series('html'))
    gulp.watch('src/css/**/*.scss', gulp.series('styles'))
    gulp.watch('src/assets/**/*.*', gulp.series('image'))
    gulp.watch('src/js/**/*.js', gulp.series('js'))
})

gulp.task('dev', gulp.series('reset', 'html', 'styles', 'image', 'js', gulp.parallel('watcher', 'server')))