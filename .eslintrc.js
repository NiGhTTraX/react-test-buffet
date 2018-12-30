module.exports = {
  'root': true,

  'parser': 'babel-eslint',

  'extends': [
    '@nighttrax/eslint-config/jsx',
    '@nighttrax/eslint-config/react-a11y',
    '@nighttrax/eslint-config/imports'
  ].map(require.resolve)
};
