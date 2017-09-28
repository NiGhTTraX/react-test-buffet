module.exports = {
  'extends': '../.eslintrc.js',

  'env': {
    'mocha': true
  },

  'rules': {
    // Factories can define inline components.
    'react/prop-types': 0,
    'jsx-a11y/no-static-element-interactions': 0,

    'func-names': 0,
    'no-unused-expressions': 0,
    'no-console': 0
  },

  'globals': {
    'expect': false
  }
};
