'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync'], function () {});

gulp.task('browser-sync', ['nodemon'], function() {
	console.log('browser-sync');
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*","*.md","*.js","routes/*.js","views/**/*.*"],
        //browser: "google chrome",
        port: 3001,
				reloadDelay: 1000
	});
});

gulp.task('nodemon', function (cb) {
	var started = false;

	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		console.log('start');
		if (!started) {
			cb();
			started = true;
		}
	}).on("restart", function () {
		console.log('restart');
    browserSync.reload("*.html");
  });
});
