var gulp = require('gulp'),
    glob = require('glob'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    proxyquireify = require('proxyquireify'),
    karmaServer = require('karma').server,
    filePatterns = require('./file-patterns');


function buildBundle(instrument, bundlePath) {
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
   * @param {String} bundlePath The path where the bundle will be saved.
   *
   * @returns {Stream}
   */

  var files = glob.sync(filePatterns.setupFiles);
  files = files.concat(glob.sync(filePatterns.testFiles));

  var bundleStream = browserify({debug: true});
  bundleStream.plugin(proxyquireify.plugin);

  bundleStream.add(files);
  bundleStream.transform('reactify');

  if (instrument === false) {
    gutil.log('Building the non instrumented bundle');
  } else {
    gutil.log('Building the instrumented bundle');
    bundleStream.transform('browserify-istanbul', {
      ignore: filePatterns.setupFiles
    });
  }

  return bundleStream
      .bundle()
      .pipe(source(bundlePath))
      .pipe(gulp.dest(filePatterns.buildPath));
}


gulp.task('build', function() {
  return buildBundle(false, filePatterns.bundleName);
});


gulp.task('build-instrumented', function() {
  return buildBundle(true, filePatterns.bundleInstrumentedName);
});


gulp.task('test', ['build'], function(done) {
  karmaServer.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done);
});


gulp.task('test-coverage', ['build-instrumented'], function(done) {
  karmaServer.start({
    configFile: __dirname + '/karma.conf.coverage.js',
    singleRun: true
  }, done);
});


gulp.task('watch-test', function() {
  gulp.watch([filePatterns.setupFiles, filePatterns.testFiles,
              filePatterns.srcFiles, 'gulpfile.js'], ['test']);
});


gulp.task('watch-build', function() {
  gulp.watch([filePatterns.setupFiles, filePatterns.testFiles,
              filePatterns.srcFiles, 'gulpfile.js'], ['build']);
});

