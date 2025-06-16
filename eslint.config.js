// import js from '@eslint/js';
// import tsPlugin from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
// import prettierConfig from 'eslint-config-prettier';
// import reactPlugin from 'eslint-plugin-react';
// import reactHooksPlugin from 'eslint-plugin-react-hooks';

// export default [
//   js.configs.recommended,
//   {
//     files: ['**/*.{js,jsx,ts,tsx}'],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tsPlugin,
//       react: reactPlugin,
//       'react-hooks': reactHooksPlugin,
//     },
//     rules: {
//       ...tsPlugin.configs['recommended'].rules,
//       ...reactPlugin.configs['recommended'].rules,
//       ...reactHooksPlugin.configs['recommended'].rules,
//       'react/react-in-jsx-scope': 'off',
//       '@typescript-eslint/explicit-module-boundary-types': 'off',
//     },
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//   },
//   prettierConfig,
// ];
