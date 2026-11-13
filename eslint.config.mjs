import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const eslintConfig = defineConfig([
  ...nextVitals,

  // Переопределяем игнорируемые директории по умолчанию
  globalIgnores([
    '.next/**',
    'out/**',
    'dist/**',
    'build/**',
    'next-env.d.ts',
    '*.config.js',
    '*.config.ts',
  ]),

  // Добавляем ваши правила
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import': importPlugin,
    },
    rules: {
      // Отключаем встроенные правила сортировки Next.js
      'sort-imports': 'off',
      'import/order': 'off',

      // Включаем simple-import-sort
      'simple-import-sort/imports': ['error', {
        groups: [
          ['^\\u0000'],           // side effects
          ['^node:'],             // node:fs, node:path
          ['^\\w', '^@(?!/)'],   // внешние пакеты (react, swiper) и алиас @content
          ['^@/'],                // алиасы (@/widgets, @/shared ...)
          ['^\\.\\.', '^\\.'],    // относительные импорты (../, ./)
        ]
      }],
      'simple-import-sort/exports': 'error',
      'import/no-duplicates': 'error',

      // Правила форматирования
      'curly': ['error', 'all'],
      'brace-style': ['error', '1tbs'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'no-irregular-whitespace': ['error', {
        skipStrings: true,
        skipComments: true,
        skipRegExps: true
      }],

      // Отключаем Next.js img предупреждение (используем <img> для статических svg/gif)
      '@next/next/no-img-element': 'off',
    },
  },
])

export default eslintConfig
