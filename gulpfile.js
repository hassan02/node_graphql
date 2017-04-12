var gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('watch', function() {
    gulp.watch(['queries/*.js', 'helpers/*.js', 'models/*.js', 'queries/*.js', 'server.js', 'tests/*.js'], ['kill-server', 'start-server', 'test'])
});

gulp.task('test', function() {
    return gulp.src(['tests/*.js'])
        .pipe(mocha({ timeout: 15000 }));
})