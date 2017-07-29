const path = require('path');

module.exports = {
  'root': true,

  'parser': 'babel-eslint',

  'env': {
    'browser': true
  },

  'extends': [
    'airbnb',
    'plugin:import/errors'
  ],

  'rules': {
    'space-before-function-paren': 0,
    'comma-dangle': [2, 'never'],
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'prefer-arrow-callback': 0,
    'arrow-parens': [2, 'as-needed'],
    'strict': 0,
    'no-use-before-define': [2, {'functions': false}],
    'no-underscore-dangle': 0,
    // https://github.com/benmosher/eslint-plugin-import/issues/414
    'import/extensions': 0,

    'react/jsx-filename-extension': 0,
    'react/jsx-wrap-multilines': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-max-props-per-line': [2, { when: 'multiline', maximum: 3 }],
    'react/jsx-no-bind': 0,
    // https://github.com/yannickcr/eslint-plugin-react/issues/1176
    'react/jsx-indent': 0,
    'react/sort-comp': [2, {
      order: [
        'displayName',
        'propTypes',
        'mixins',
        'statics',
        'getDefaultProps',
        'defaultProps',
        'getInitialState',
        'constructor',
        'render',
        '/^_render.+$/', // any auxiliary _render methods
        'componentWillMount',
        'componentDidMount',
        'componentWillReceiveProps',
        'shouldComponentUpdate',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount',
        '/^on[A-Z].+$/', // event handlers
        'everything-else',
        '/^_.+$/' // private methods
      ]
    }],

    // Autofocus is said to dissorient users with cognitive disabilities.
    // However, the same spec
    // (https://w3c.github.io/html/sec-forms.html#autofocusing-a-form-control-the-autofocus-attribute)
    // says that user agents should provide a way to disable autofocus
    // behaviour.
    'jsx-a11y/no-autofocus': 0
  }
}
