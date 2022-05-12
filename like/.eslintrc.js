module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
            // semi: 0,
            // "comma-dangle": 0,
            // "no-trailing-spaces": 0,
            // quotes: 0,
            // indent: 0,
            // "quote-props": 0,
            // "spaced-comment": 0,
    }
}