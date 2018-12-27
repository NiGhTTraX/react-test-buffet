module.exports = {
  'root': true,

  'parser': 'babel-eslint',

  'extends': [
    '@nighttrax/eslint-config',
    '@nighttrax/eslint-config/react',
    '@nighttrax/eslint-config/react-a11y',
    '@nighttrax/eslint-config/imports'
  ].map(require.resolve)
};
