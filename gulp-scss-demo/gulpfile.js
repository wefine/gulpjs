var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function () {
    console.log('Hello Gulp!');
});

gulp.task('sass', function () {
    return gulp
        .src('app/scss/**/*.scss')
        .pipe(sass()) // 用gulp-sass编译scss文件
        .pipe(gulp.dest('build/app/css'))
});

//自动监听文件改变
gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // 其他任务
});