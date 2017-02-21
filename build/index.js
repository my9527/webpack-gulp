/**
 * Created by my on 17/2/21.
 */

var gulp = require('gulp');
var config = gulp.config;

var shelljs = require('shelljs');
var runSequence = require('gulp-sequence');

var workFlow = require('./work-flow');




require('./tasks');

gulp.task('dev', runSequence('clean','get-modules', 'preprocess-webpack', 'start-server'));
gulp.task('build', runSequence('clean', 'get-modules', 'preprocess-webpack','start-build'));

