/*import {series} from 'gulp';*/
import gulp from 'gulp';
import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';
import {image} from 'gulp-image';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
const sass = gulpSass(nodeSass);

/*import stripJs from 'gulp-strip-comments';
import stripCss from 'gulp-strip-css-comments';*/

/*import babel from 'gulp-babel';
import browserSync from 'browser-sync';*/

/*const stripJs = require('gulp-strip-comments')
const stripCss = require('gulp-strip-css-comments')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload*/

// const gulp = require('gulp')
// const concat = require('gulp-concat')
// const cssmin = require('gulp-cssmin')
// const rename = require('gulp-rename')
// const uglify = require('gulp-uglify')
// const image = require('gulp-image')

function tarefasCSS(cb) {

    return gulp.src('./vendor/**/*.css')
        .pipe(concat('libs.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min'})) // libs.min.css
        .pipe(gulp.dest('./dist/css'))


}


function tarefasJS(){

    return gulp.src('./vendor/**/*.js')
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'})) //libs.min.js
        .pipe(gulp.dest('./dist/js'))
}


function tarefasImagem(){
    
    return gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}


gulp.task('styles', function() {
	return gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './vendor/owl/css/owl.css',
        './vendor/jquery-ui/jquery-ui.css',
    ])

        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min'})) // libs.min.css
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('sass', function(){
    return gulp.src('./src/scss/**/*.scss')

        .pipe(sass()) // transforma o sass para css
        .pipe(gulp.dest('./dist/css')) 
});

gulp.task('scripts', function() {
	return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './vendor/owl/js/owl.js',
        './vendor/jquery-mask/jquery.mask.js',
        './vendor/jquery-ui/jquery-ui.js',
        './src/js/custom.js'
    ])

        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'})) //libs.min.js
        .pipe(gulp.dest('./dist/js'))
});
gulp.task('images', function() {
	return gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
});


// POC - Proof of Concept

gulp.task('htmlmin',function(){
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))

})


gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process) // repete o processo quando alterar algo em src
    gulp.watch('./src/**/*').on('change', reload)

})

/*const process = series( tarefasHTML, tarefasJS, tarefasCSS)
exports.default = process*/



// module.exports.styles = tarefasCSS
// module.exports.scripts = tarefasJS
// module.exports.images = tarefasImagem