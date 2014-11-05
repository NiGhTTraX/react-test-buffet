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

Running `gulp test` will build the Istanbul instrumented testing bundle and
start karma. Karma is configured to run the tests in Firefox, Chrome and
PhantomJS. You can find coverage reports in the `coverage/` folder.

If you want to run the tests in your own browsers, run `gulp build` to build the
non instrumented testing bundle and then open `runner.html`.

