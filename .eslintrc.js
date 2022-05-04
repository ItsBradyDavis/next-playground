module.exports = {
    extends: 'get-off-my-lawn',
    ignorePatterns: [
        '/coverage/*',
        'jest.config.js',
    ],
    rules: {
        'node/no-sync': 0,
        // enable additional rules, override rule options, or disable rules
    },
};
