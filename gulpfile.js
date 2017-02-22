var gulp = require('gulp'),
    browserSync = require('browser-sync');


gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'src/main/resources/static/' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
