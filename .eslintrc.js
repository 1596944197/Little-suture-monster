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
    },
    ignorePatterns: ['.eslintrc.*', 'vite.config.*'],
}
