## Debugging the acceptance tests

### Watching the browser

Run `npm run test:acceptance:debug` and when you start seeing output from the
test command connect to `vnc://localhost:5900` with the password `secret`. Sit
back and enjoy the browser doing things too fast for you to actually comprehend
what's going on.


### Debugging the page

Add `browser.debug()` inside your test and run `npm run test:acceptance:debug`.
You will get a REPL where you can access the global `browser` instance.


### Debugging the tests

Add `browser.debug()` inside your test and run `npm run test:acceptance:debug`.
When at the REPL, open the debug URL in a browser, set your breakpoints, and
type `.exit` in the REPL to continue debugging in Chrome DevTools.

![debugging-acceptance-tests](./docs/debugging-acceptance-tests.gif)
