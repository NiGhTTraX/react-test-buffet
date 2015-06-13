var gulp = require('gulp'),
    glob = require('glob'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    proxyquireify = require('proxyquireify'),
    karmaServer = require('karma').server,
    filePatterns = require('./file-patterns'),
    _ = require('lodash');


function buildBundle(files, options) {
  /**
   * Build the testing bundle.
   *
   * We first pipe the files through reactify so .jsx files are compiled to
   * plain JS. Then we instrument them with Istanbul so we can generate coverage
   * reports. Depending on the instrument param, we either create an
   * instrumented bundle or a non instrumented bundle.
   *
   * @param {Files[]|String[]} files The bundle entry points.
   * @param {Object} options
   * @param {Boolean} [options.instrument=false] Whether to instrument the
   *     files with Istanbul.
   * @param {String[]} [options.ignore=[]] If options.instrument is true, these
   *     files will not be instrumented for coverage.
   *
   * @returns {Stream}
   */

  var defaults = {
    instrument: false,
    ignore: []
  }, opts = _.extend(defaults, options);

  var bundleStream = browserify(files, {debug: true});

  bundleStream.plugin(proxyquireify.plugin);
  bundleStream.transform('reactify');

  if (opts.instrument === true) {
    gutil.log('Building the instrumented bundle');
    bundleStream.transform('browserify-istanbul', {
      ignore: opts.ignore
    });
  } else {
    gutil.log('Building the non instrumented bundle');
  }

  return bundleStream.bundle();
}


function gatherFiles() {
  /**
   * We first glob for the test setup files. They need to run before all the
   * tests so make sure we put them first. Then we add the test files
   * themselves. Any dependencies will be handled by Browserify.
   *
   * @returns {Files[]}
   */

  var files = glob.sync(filePatterns.setupEntrypoint);
  files = files.concat(glob.sync(filePatterns.testFiles));

  return files;
}


gulp.task('build', function() {
  return buildBundle(gatherFiles())
      .pipe(source(filePatterns.bundleName))
      .pipe(gulp.dest(filePatterns.buildPath));
});


gulp.task('build-instrumented', function() {
  return buildBundle(gatherFiles(),
                     {instrument: true, ignore: filePatterns.setupFiles})
      .pipe(source(filePatterns.bundleInstrumentedName))
      .pipe(gulp.dest(filePatterns.buildPath));
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

