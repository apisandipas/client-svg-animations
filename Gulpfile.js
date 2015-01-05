var gulp = require('gulp'),
    $    = require('gulp-load-plugins')();

gulp.task('deploy:staging', $.shell.task([
    'rsync -av --delete ./ vm-fvdemo@doejocloud.com:/home/apps/www/current/'
]));

// gulp.task('default', ['deploy:staging']);