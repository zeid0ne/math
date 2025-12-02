import esLint from '@eslint/js'
import globals from 'globals'
import vitest from 'eslint-plugin-vitest'
import vue from 'eslint-plugin-vue'
import sonarjs from 'eslint-plugin-sonarjs'
import stylistic from '@stylistic/eslint-plugin'
import tsEslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: [
      '.quasar',
      'build',
      'coverage',
      'deploy/deploy.js',
      'dist',
      '**/.scannerwork/**',
      '**/*.d.ts',
      '**/*.config.js',
      '**/scripts/*.js',
      '**/*.cjs',
      '**/*.mjs'
    ],
  }, 
  esLint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...vue.configs['flat/recommended'],
  sonarjs.configs.recommended,
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: { stylistic },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        parser: tsParser
      }
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      'eol-last': ['error', 'always'],
      semi: ['error', 'never'],
      'space-before-function-paren': ['error', 'always'],
      'keyword-spacing': ['error', { 'before': true }],
      // stylistic
      'stylistic/space-infix-ops': 'error',
      'stylistic/key-spacing': ['error', { 'afterColon': true, 'beforeColon': false }],
      'stylistic/no-multi-spaces': 'error',
      'stylistic/no-multiple-empty-lines': ['error', { 'max': 1 }],
      'stylistic/no-trailing-spaces': 'error',
      'stylistic/quotes': ['error', 'single'],
      'stylistic/keyword-spacing': ['error', { 'before': true }],
      'stylistic/indent': ['error', 2],
      'stylistic/object-curly-spacing': ['error', 'always'],
      // typescrypt eslint
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      "@typescript-eslint/consistent-type-imports": "error",
      // vue
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          'singleline': 'never',
          'multiline': 'always',
          'selfClosingTag': {
            'singleline': 'never',
            'multiline': 'always'
          }
        }
      ],
      'vue/html-indent': ['error', 2, {
        'attribute': 1,
        'baseIndent': 1
      }],
      'vue/first-attribute-linebreak': ['error', {
        'singleline': 'ignore',
        'multiline': 'below'
      }],
      'vue/max-attributes-per-line': ['error', {
        'singleline': { 'max': 1 },
        'multiline': { 'max': 1 }
      }],
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'error',
      // sonar
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/cors': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/no-control-regex': 'off', // already covered by eslint
      'sonarjs/no-dead-store': 'off', // already covered by typescript-eslint
      'sonarjs/no-hardcoded-passwords': 'off',
      'sonarjs/no-misused-promises': 'off',
      'sonarjs/no-empty-function': 'off',
      'sonarjs/no-nested-functions': 'off',
      'sonarjs/no-unused-import': 'off', // already covered by typescript-eslint
      'sonarjs/no-unused-vars': 'off',  // already covered by typescript-eslint
      'sonarjs/no-vue-bypass-sanitization': 'off',
      'sonarjs/os-command': 'off',
      'sonarjs/pseudo-random': 'off',
      'sonarjs/slow-regex': 'off',
      'sonarjs/todo-tag': 'off',
      'sonarjs/cognitive-complexity': 'warn'
    }
  },
  {
    files: ['**/*.spec.{js,ts}'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.all.rules,
      'vitest/consistent-test-filename': 'off',
      'vitest/prefer-expect-assertions': 'off',
      'vitest/prefer-called-with': 'off',
      'vitest/no-hooks': 'off',
    }
  }
]