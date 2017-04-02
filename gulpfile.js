var gulp = require('gulp'),
  pug = require('gulp-pug');

gulp.task('convertPug', function() {
  return gulp.src('./public/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public/pugToHtml/'));
});
