/**
 * Created by my on 17/2/21.
 */

var gulp = require('gulp');
var through2 = require('through2');
var config = gulp.config;

function getModules(){
    var filePath = gulp.config.modules;

    return gulp.src(filePath)
        .pipe(through2.obj(function (file, enc, cb) {
            // 根据相对路径获取模块名，模块内部支持文件夹形式
            var filename = file.relative.split('\/');

            if(-1 == config.modNames.indexOf(filename[0])){
                gulp.config.modNames.push(filename[0]);
            }
            this.push(file);
            cb();
        }))
        .on("end", function () {

            console.log(gulp.config.modNames.join("\n"));
        })
}

module.exports = {
    getModules: getModules
}