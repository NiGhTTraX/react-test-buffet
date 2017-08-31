const STATIC_ASSET = /\.(less|css)$/;


/**
 * Remove any imports of static assets.
 */
module.exports = () => ({
  visitor: {
    ImportDeclaration(path) {
      // TODO: remove once https://github.com/istanbuljs/nyc/issues/581 is fixed
      /* istanbul ignore next */
      if (STATIC_ASSET.test(path.node.source.value)) {
        path.remove();
      }
    }
  }
});
