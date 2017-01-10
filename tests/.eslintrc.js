module.exports = {
  'extends': '../.eslintrc.js',

  'env': {
    'mocha': true
  },

  'rules': {
    'func-names': 0,
    'no-unused-expressions': 0,
    'no-console': 0,

    // These are said to be deprecated, but we use them in tests.
    'react/no-find-dom-node': 0,
    'react/no-render-return-value': 0,
  },

  'globals': {
    'expect': false
  }
};
