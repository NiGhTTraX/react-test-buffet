react-test-buffet
=================

Complete example of testing React components with Mocha, Chai and Sinon, running
the tests in real browsers using Karma and Browserify and generating code
coverage with Istanbul.


## Testing tools

- [Mocha](http://mochajs.org/) - testing framework
- [Chai](chaijs.com) - assertion library
- [Sinon](sinonjs.org) - mocking library
- [Karma](http://karma-runner.github.io/0.12/index.html) - test runner
- [PhantomJS](http://phantomjs.org/) - headless WebKit
- [Istanbul](http://gotwarlost.github.io/istanbul/) - code coverage


## Running the tests

Running `gulp test` will build the non instrumented testing bundle and
start karma. Karma is configured to run the tests in Firefox, Chrome and
PhantomJS.

To generate code coverage reports, run `gulp test-coverage`. This will
instrument the source files with Istanbul and build an instrumented bundle.
You can find coverage reports in the `coverage/` folder.

If you want to run the tests in your own browsers, run `gulp build` to build the
non instrumented testing bundle and then open `runner.html`.


## Stack traces

Stack traces pointing to original line numbers are achieved using:
- [karma-sourcemap-loader](https://github.com/demerzel3/karma-sourcemap-loader)
  for Karma
- [source-map-support](https://github.com/evanw/node-source-map-support) for the
  manual test runner

Unfortunately, due to the fact that Istanbul doesn't preserve line numbers in
the instrumented code, when generating coverage, all stack traces in Karma will
point to line 9 since that's where it puts all the original code.

Also, stack traces in the manual test runner only work if the runner is **served
by a server** and not through the `file:` protocol.

Enabling source maps in the strack traces adds some overhead since they need to
be loaded and parsed.

