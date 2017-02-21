/**
 * Created by my on 17/2/21.
 */

var gulp = require('gulp');
var config = gulp.config;

function devHtml() {
    return gulp.src('./src/modules/**/*.html')
        .pipe(gulp.dest('./dist/html'))
}

function devLess() {

}

module.exports = {
    devHtml: devHtml,
    devLess: devLess
}