import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config([
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {browser: 'readonly'},
            parserOptions: {project: ['./tsconfig.app.json']}, // для type-aware rules
        },
        plugins: {'react-hooks': reactHooks},
        rules: {
            '@typescript-eslint/no-explicit-any': 'error', // запрещаем any
            '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
            'react-hooks/exhaustive-deps': 'warn', // проверка зависимостей useEffect
            'no-console': ['warn', {allow: ['warn', 'error']}],
        },
    },
]);