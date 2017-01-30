module.exports = {
  'extend': '../.eslintrc.js',

  'rules': {
    'import/no-extraneous-dependencies': ['error', {
      // It's ok to import dev deps in here.
      'devDependencies': true
    }]
  }
};
