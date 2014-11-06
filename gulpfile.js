var gulp = require('gulp'),
    glob = require('glob'),
    gutil = require('gulp-util'),
    argv = require('yargs').argv,
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    proxyquireify = require('proxyquireify');


var buildPath = './build/',
    setupFiles = './tests/setup/**/*.js',
    testFiles = './tests/components/**/*.js',
    srcFiles = './src/**/*.jsx';


function buildBundle(instrument) {
  /**
   * Build the testing bundle.
   *
   * We add the setup files and testing files as entry points so they get
   * executed when the bundle is loaded. Everything else that is required
   * through those files will be handled by Browserify.
   *
   * We first pipe the files through reactify so .jsx files are compiled to
   * plain JS. Then we instrument them with Istanbul so we can generate coverage
   * reports. Depending on the instrument param, we either create an
   * instrumented bundle or a non instrumented bundle.
   *
   * @param {Boolean} instrument Whether to instrument the files with Istanbul.
   *
   * @returns {Stream}
   */

  var files = glob.sync(setupFiles);
  files = files.concat(glob.sync(testFiles));

  var bundleStream = browserify({debug: true});
  bundleStream.plugin(proxyquireify.plugin);

  bundleStream.add(files);
  bundleStream.transform('reactify');

  var bundlePath;
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
  return buildBundle(false);
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


gulp.task('watch-test', function() {
  gulp.watch([setupFiles, testFiles, srcFiles, 'gulpfile.js'], ['test']);
});


gulp.task('watch-build', function() {
  gulp.watch([setupFiles, testFiles, srcFiles, 'gulpfile.js'],
             ['build-non-instrumented']);
});

