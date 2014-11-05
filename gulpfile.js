var gulp = require('gulp'),
    glob = require('glob'),
    gutil = require('gulp-util'),
    argv = require('yargs').argv,
    source = require('vinyl-source-stream'),
    browserify = require('browserify');


var buildPath = './build/',
    setupFiles = './tests/setup/**/*.js',
    testFiles = './tests/components/**/*.js',
    srcFiles = './src/**/*.jsx';


function buildBundle(instrument) {
  var files = glob.sync(setupFiles);
  files = files.concat(glob.sync(testFiles));

  var bundleStream = browserify({debug: true});
  var bundlePath;

  bundleStream.add(files);
  bundleStream.transform('reactify');

  if (instrument === false) {
    gutil.log('Building the non instrumented bundle.');
    bundlePath = 'tests-no-instrument.js';
  } else {
    gutil.log('Building the instrumented bundle');
    bundlePath = 'tests.js';
    bundleStream.transform('browserify-istanbul', { ignore: setupFiles });
  }

  return bundleStream
      .bundle()
      .pipe(source(bundlePath))
      .pipe(gulp.dest(buildPath));
}


gulp.task('build-non-instrumented', function() {
  return buildBundle;
});


gulp.task('build-instrumented', function() {
  return buildBundle(true);
});

gulp.task('build', function() {
  return buildBundle(argv.instrument || false);
});


gulp.task('test', ['build-instrumented'], function(done) {
  var karma = require('karma').server;
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});


gulp.task('watch', function() {
  gulp.watch([setupFiles, testFiles, srcFiles], ['test']);
});

