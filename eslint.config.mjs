// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    '@stylistic/arrow-parens': 'off',
    '@stylistic/template-tag-spacing': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@stylistic/semi': ['error', 'always'],
    'vue/no-v-html': 'off',
    'vue/operator-linebreak': ['error', 'before'],
    'vue/multi-word-component-names': 'off'
  }
});
