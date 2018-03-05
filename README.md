An all-you-can-eat buffet of React TDD
======================================

[![Build Status](https://travis-ci.org/NiGhTTraX/react-test-buffet.svg?branch=master)](https://travis-ci.org/NiGhTTraX/react-test-buffet) [![Greenkeeper badge](https://badges.greenkeeper.io/NiGhTTraX/react-test-buffet.svg)](https://greenkeeper.io/)

----


## Testing tools

- [Mocha](http://mochajs.org/) - testing framework
- [Chai](http://chaijs.com) - assertion library
- [Sinon](http://sinonjs.org) - mocking library
- [jsdom](https://github.com/tmpvar/jsdom) - server side DOM
- [Babel](https://babeljs.io/) - transpile ES6 (including JSX) to ES5
- [Webpack](https://webpack.github.io/) - module bundler
- [Istanbul](http://gotwarlost.github.io/istanbul/) - code coverage
- [WebdriverIO](http://webdriver.io/) - Selenium 2.0 bindings for NodeJS
- [Selenium](http://www.seleniumhq.org/) - Web Browser Automation
- [Docker](https://www.docker.com/) - containerization platform
- [Mugshot](https://github.com/uberVU/mugshot) - visual regression testing


# Running the app

![npm-start](./docs/npm-start.gif)

Running `npm start` will spin up a Docker container that will install the npm
packages and start a Webpack dev server with hot reloading. Changes to the
source code on the host will be reflected inside the container. Having the app
in the container removes the need for devs to install Node and the npm packages
on their machines. This in turn makes it very easy to get rid of problems where
developers get out of sync with the Node version or have stale packages
installed.

If you need to stop/restart the container you can use `npm stop`. Given that you
don't change the `package.json` file, the npm packages will be cached next time
you start the container.

If for some reason you prefer to install everything locally, you can use `npm
run _start` instead.


# Unit tests

Unit tests should check a single unit at a time - in the case of UI, a single
component. And what I mean by single component is exactly that, rendering only
one component, without any child components.

Why? Because unit tests should clearly separate your concerns.

If you render `Checkbox` alongside `Todo` you couple them together. And testing
`Todo` in this way will also test `Checkbox` and if `Checkbox` suddenly has a
bug then your tests will tell you that `Todo` also has a bug, which is not true.


## Running the tests in Node

![unit-tests-in-node](./docs/unit-tests-in-node.png)

`npm run test:unit` will run the tests in Node using `Mocha`. This is useful for a rapid
feedback loop. You can also watch them for changes with `npm run
test:unit:watch`.

`jsdom` is used for providing a DOM implementation in Node. `jsdom` is pretty
cool, but it falls short when you need additional browser behavior like local
storage or style cascading.


## Debugging the tests

![debugging-unit-tests](./docs/debugging-unit-tests.png)

`npm run test:unit:debug` will build a bundle using `webpack` that you can open
in your favorite browser by going to
[tests/unit/debug.html](./tests/unit/debug.html). You can then use the dev tools
and set breakpoints and step through your code. I find this easier than
debugging in Node with the node inspector.


## Coverage

![coverage](./docs/coverage.png)

The tests automatically generate coverage reports using `Istanbul`. You can find
them in the [tests/results/coverage](./tests/results/coverage/index.html)
folder. **Both unit tests and acceptance tests report coverage** which allows
reaching 100% coverage for those cases where unit tests are not enough (scroll
event handlers, browser quirks, etc.).


# Acceptance tests

![acceptance-tests](./docs/acceptance-tests.png)

Use these to validate the client needs of your product. Always start with a
failing acceptance test for every new feature. Then write failing unit tests to
drive your design.

The tests open actual browsers (Chrome and Firefox) and control them through
`Selenium`. Everything happens in `Docker` containers for stable and
reproducible builds.


## Debugging the acceptance tests

![debugging-acceptance-tests](./docs/debugging-acceptance-tests.gif)

Add `debugger` statements in your tests and run `npm run test:acceptance:debug`.
The tests won't start until you connect to the debugger by going to
[chrome://inspect](chrome://inspect) and selecting the local debugger target.
You're going to need [Chrome
55+](https://nodejs.org/en/docs/inspector/#chrome-devtools-55) for this to work.

Once in the inspector, press the continue execution button and the tests will
start running.

Alongside debugging the test code, you can also follow the state of the browser
by connecting with VNC to [localhost:5900](vnc://localhost:5900) with the
password `secret`.


# Visual regression tests

![visual-tests](./docs/visual-tests.png)

If you want to also take a screenshot after an acceptance test and
compare it on the next runs, simply use `vit` (_visual_ it) instead of
`it`.

```js
import { describe, vit } from './suite.js';

describe('My app', () => {
    vit('should look the same', async browser => {
      await browser.click('.foobar');
    });
});
```

The screenshot will be taken at the end of the test definition
only if there were no exceptions thrown. Think of it as an extra
assertion at the end of the test.

If there are any visual changes a diff will be created highlighting
them and the test will fail. If the changes are deliberate you should
commit the new screenshot and rerun the tests. You can find the new
screenshots and diffs in the
[tests/acceptance/screenshots](./tests/acceptance/screenshots) folder.
