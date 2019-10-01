module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: [
    'jest'
  ],
  extends: [
    'standard',
    'plugin:jest/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
  }
}
