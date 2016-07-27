react-test-buffet
=================

[![Join the chat at https://gitter.im/NiGhTTraX/react-test-buffet](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/NiGhTTraX/react-test-buffet?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Complete example of testing React components with Mocha, Chai and Sinon, running
the tests in real browsers using Karma and Browserify and generating code
coverage with Istanbul.


## Testing tools

- [Mocha](http://mochajs.org/) - testing framework
- [Chai](http://chaijs.com) - assertion library
- [Sinon](http://sinonjs.org) - mocking library
- [jsdom](https://github.com/tmpvar/jsdom) - server side DOM
- [Babel](https://babeljs.io/) - transpile ES6 (including JSX) to ES5
- [Browserify](http://browserify.org/) - CommonJS in the browser
- [Karma](http://karma-runner.github.io/0.12/index.html) - test runner
- [PhantomJS](http://phantomjs.org/) - headless WebKit
- [Istanbul](http://gotwarlost.github.io/istanbul/) - code coverage
- [babelify](https://github.com/babel/babelify) - Babel transform for Browserify


## Running the tests in Node

`npm test` will run the tests in Node using `Mocha`. This is useful for a rapid
feedback loop.

`jsdom` is used for providing a DOM implementation in Node. `jsdom` is pretty
cool, but if falls short when you need additional browser behavior like local
storage or style cascading.


## Running the tests in real browsers

`npm run test-browser` will run the tests in real browsers using `Karma` and
`Browserify`. This is useful for debugging (Chrome dev tools rock!) and when
`jsdom` is not enough.

Running `gulp test` will build the non instrumented testing bundle and
start karma. Karma is configured to run the tests in Firefox and Chrome.

To generate code coverage reports, run `gulp test-coverage`. This will
instrument the source files with Istanbul and build an instrumented bundle.
You can find coverage reports in the `coverage/` folder.

If you want to run the tests in your own browsers, run `gulp build` to build the
non instrumented testing bundle and then open `runner.html`.

If you want to run the tests inside a CI environment you can use the
karma.conf.ci.js that will run the tests in PhantomJS and generate cobertura
coverage reports. You need to build the instrumented bundle first by running
`gulp build-instrumented`.


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


## Debugging the tests

The bundle is built using source maps so you can step through your original
code. Moreover, there's a special div with the id `test-area`, which is
positioned offscreen, which you can use to render components in tests. It's
bound to `this.container` inside the tests. When debugging, you can remove its
absolute positioning to make it visible and see how your rendered components
look like.

Any console calls will output to the terminal when run through Karma and to the
actual console when running through the manual test runner.
