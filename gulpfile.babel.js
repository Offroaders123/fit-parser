import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import jshint from 'gulp-jshint';
import del from 'del';
import runSequence from 'gulp4-run-sequence';

var config = {
  paths: {
    js: {
      src: 'src/**/*.js',
      dist: 'dist/',
    },
    test: {
      src: 'test/**/*.js',
      dist: 'test-dist/',
      run: 'test-dist/**/*.js',
    }
  }
};

gulp.task('clean', () =>
  del(config.paths.js.dist)
);

gulp.task('lint-src', () =>
  gulp.src(config.paths.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
);

gulp.task('babel-src', gulp.series('lint-src', () =>
  gulp.src(config.paths.js.src)
    .pipe(babel())
    .pipe(gulp.dest(config.paths.js.dist))
));

gulp.task('lint-test', () =>
  gulp.src(config.paths.test.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
);

gulp.task('babel-test', gulp.series('lint-test', () =>
  gulp.src(config.paths.test.src)
    .pipe(babel())
    .pipe(gulp.dest(config.paths.test.dist))
));

gulp.task('babel', gulp.series('babel-src', 'babel-test'));

gulp.task('watch', () => {
  gulp.watch(config.paths.js.src, gulp.series('babel-src', 'test'));
  gulp.watch(config.paths.test.src, gulp.series('babel-test', 'test'));
});

gulp.task('test', gulp.series('babel', () =>
  gulp.src([config.paths.test.run])
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', err => console.log(err.stack))
));

// Default Task
gulp.task('default', () =>
  runSequence('clean', ['babel', 'test'])
);
