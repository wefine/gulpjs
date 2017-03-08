// 加载插件
var gulp = require('gulp'),
    minifycss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

// css
gulp.task('css', function () {
    return gulp.src('src/css/main.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'))
});

// script
gulp.task('script', function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});

// image
gulp.task('image', function () {
    return gulp.src('src/image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/image'))
});

// 默认任务
gulp.task('default', function () {
    gulp.start('script', 'css', 'image');
});

// 监视
gulp.task('watch', function () {
    // 监视css文件的改动
    gulp.watch('src/css/*.css', ['css']);
    // 监视js文件的改动
    gulp.watch('src/js/*.js', ['script']);
    // 监视image文件的改动
    gulp.watch('src/image/*', ['image']);
    // 创建浏览器自动刷新服务器
    livereload.listen();
    // dist目录下文件有改动就会浏览器刷新
    gulp.watch(['dist/**/*.*']).on('change', livereload.changed);
});

gulp.task('hello', function () {
    console.log("hello");
});

var cheerio = require('gulp-cheerio');
var prevMsgs = {};
gulp.task('cheerio', function () {
    return gulp
        .src('messages-en.xtb')
        .pipe(cheerio(function ($) {
            $('translation').each(function (i, translation) {
                var key = $(translation).attr('key');

                var index = key.lastIndexOf('_');
                if (index !== -1) {
                    var lastpart = key.substring(index + 1);
                    console.log(lastpart);
                    if (/^[0-9]+$/.test(lastpart)) {
                        var indexSuffix = Number(lastpart);
                        var filePrefix = key.substring(0, index);
                        if (!prevMsgs[filePrefix]) {
                            prevMsgs[filePrefix] = [];
                        }
                        prevMsgs[filePrefix].push({
                            index: indexSuffix,
                            key: key,
                            text: $(translation).text(),
                            desc: $(translation).attr('desc'),
                            used: false
                        });
                    }
                }

            })
        }));
});