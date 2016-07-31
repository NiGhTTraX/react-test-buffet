module.exports = {
  'root': true,

  'parser': 'babel-eslint',

  'extends': [
    'airbnb',
    'plugin:import/errors'
  ],

  'settings': {
    'react': {
      'version': '0.13'
    }
  },

  'rules': {
    'space-before-function-paren': 0,
    'comma-dangle': [2, 'never'],
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'prefer-arrow-callback': 0,
    'strict': 0,
    'no-use-before-define': [2, {'functions': false}],
    'no-underscore-dangle': 0,

    'react/wrap-multilines': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-no-bind': 0,
    'react/sort-comp': 0
  }
}
