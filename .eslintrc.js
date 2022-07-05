module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: [
    '@antfu/eslint-config',
    'eslint:recommended',
    'standard',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],

  rules: {
    'no-console': 'off', // 禁用 console
    'no-debugger': 'off', // 禁用 debugger
    'no-alert': 'off', // 禁用 alert
    semi: 1,
    // indent: ['error', 2, { SwitchCase: 1 }], // 强制使用两个空格作为缩进

    '@typescript-eslint/semi': 0,
    'comma-dangle': ['error', 'always-multiline'], // 逗号结束
    'no-param-reassign': 'error', // 禁止对 function 的参数进行重新赋值
    'prettier/prettier': 'error', // prettier
    'prefer-rest-params': 0,
    // 'prefer-const': 0,

    // '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0, // 禁用 any 类型
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
  },

  ignorePatterns: ['out', 'dist', '**/*.d.ts'],
};
