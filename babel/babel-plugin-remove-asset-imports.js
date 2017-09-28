const STATIC_ASSET = /\.(less|css)$/;


/**
 * Remove any imports of static assets.
 */
module.exports = () => ({
  visitor: {
    ImportDeclaration(path) {
      if (STATIC_ASSET.test(path.node.source.value)) {
        path.remove();
      }
    }
  }
});
