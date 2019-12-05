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
    "eslint:recommended",
    "plugin:vue/recommended",
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "vue/max-attributes-per-line": "off",
    "no-console": "off",
    "vue/attribute-hyphenation": "off",
    "vue/html-self-closing": "off",
  }
}
