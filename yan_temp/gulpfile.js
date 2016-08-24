var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
	server: {
	    baseDir: "./"
	}
    });
    gulp.watch("*.html", ['bs-reload']);
    gulp.watch("*./js/*", ['bs-reload']);
    gulp.watch("./css/*", ['bs-reload']);
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function(){
    gulp.watch("src/styles/**/*.scss", ['styles']);
    gulp.watch("*.html", ['bs-reload']);
});
