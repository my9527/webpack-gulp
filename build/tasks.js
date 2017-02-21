/**
 * Created by my on 17/2/21.
 */


var gulp = require('gulp');
var workFlow = require('./work-flow');
var preprocess = require('gulp-preprocess');
var del = require('del');
var shelljs = require('shelljs');
var devBasis = require('./dev-basis');

    gulp.task('clean', function () {
        return del(['./dist/*', './webpack.config.js']);
    });

    gulp.task('get-modules', function () {
        return workFlow.getModules()
            .on('end', function () {
                let entries = {};
                gulp.config.modNames.forEach(function (item) {
                    if(item=='home')return;
                    entries[item] = './src/modules/'+item+'/index.js';
                });

                // gulp.config.webpack.entries.splice(gulp.config.webpack.entries.indexOf('home'), 1)
                gulp.config.webpack.entries = JSON.stringify(entries);
                // console.log(webpackConfig);
            });
    });

    gulp.task('preprocess-webpack', function () {
       return gulp.src('./build/webpack.config.js')
                .pipe(preprocess({context: gulp.config}))
                .pipe(gulp.dest('./'))

    });

    gulp.task('start-server', function () {
        shelljs.exec('npm start');
    });

    gulp.task('start-build', function () {
        setTimeout(function () {
            shelljs.exec('npm run build')
        }, 1000);
    });

    gulp.task('dev-html', function () {
        return devBasis.devHtml();
    })
