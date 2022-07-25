module.exports = {
  parser: '@babel/eslint-parser',
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // "indent": ["error", 4]
  },
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
};
