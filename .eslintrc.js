module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended', //
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:import/recommended',
    'plugin:react/jsx-runtime', // prevent warning: 'React' must be in scope when using JSX
    'prettier', // eslint-config-prettier
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react', //
    'react-hooks',
    'simple-import-sort',
    'import',
    'prettier', // eslint-plugin-prettier, // require by "source.fixAll.eslint": true
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/no-unresolved': ['error', { commonjs: true, amd: true }],
    'import/no-extraneous-dependencies': [
      'warn',
      { devDependencies: false, optionalDependencies: false, peerDependencies: false },
    ],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn', // default in airbnb is error
  },
};
