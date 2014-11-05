var sinon = require('sinon'),
    sandbox = sinon.sandbox.create();


function getClassProto(_class) {
  /**
   * Get the prototype of a React class.
   *
   * @param {React} _class
   *
   * @return {prototype}
   */

  return _class.type.prototype;
}


function getMethodLocation(_class, method) {
  /**
   * Get the object of which a method is part of.
   *
   * React automagically binds event handlers and stores a cache of them. If we
   * find the method there then we return the cache. Otherwise, we return the
   * class prototype.
   *
   * @param {React} _class
   * @param {String} method
   *
   * @returns {Object}
   */

  var proto = getClassProto(_class);

  if (proto.__reactAutoBindMap[method]) {
    return proto.__reactAutoBindMap;
  }

  return proto;
}


module.exports.spyOnMethod = function(_class, method) {
  /**
   * Spy a method on a React class.
   *
   * Warning: The spy will not call through!
   *
   * @param {React} _class
   * @param {String} method The name of the method you want to spy on.
   *
   * @returns {Spy}
   */

  var methodLoc = getMethodLocation(_class, method);

  return sandbox.spy(methodLoc, method);
};


module.exports.stubMethod = function(_class, method, resp) {
  /**
   * Stub a method on a React class.
   *
   * @param {React} _class
   * @param {String} method The name of the method you want to stub.
   * @param {*} resp The response the stub should return.
   *
   * @returns {Stub}
   */

  var methodLoc = getMethodLocation(_class, method);

  return sandbox.stub(methodLoc, method).returns(resp);
};


afterEach(function() {
  /**
   * Cleanup everything.
   */

  sandbox.restore();
});

