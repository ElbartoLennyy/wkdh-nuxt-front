module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
  },
}
