module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
        'prettier'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            "jsx": true
        },
        project: [
            './tsconfig.json'
        ]
    },
    plugins: [
        'react',
        'prettier'
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        '@typescript-eslint/no-floating-promises': 0,
        'import/no-absolute-path': 0,
        '@typescript-eslint/return-await': 0,
        'n/no-callback-literal': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/strict-boolean-expressions': 0,
        '@typescript-eslint/restrict-plus-operands': 0,
        'react/react-in-jsx-scope': 0
    },
    ignorePatterns: ['.eslintrc.*', 'vite.config.*'],
}
