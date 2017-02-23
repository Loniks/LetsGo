var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass');


gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'src/main/resources/static/' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('sass', function() {
    return gulp.src('src/main/resources/static/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/main/resources/static/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('src/main/resources/static/sass/**/*.scss', ['sass']);
    gulp.watch('src/main/resources/static/**/*.html', browserSync.reload);
    gulp.watch('src/main/resources/static/js/**/*.js', browserSync.reload);
})