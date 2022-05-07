module.exports = {
    extends: 'get-off-my-lawn',
    ignorePatterns: [
        '/coverage/*',
        'jest.config.js',
    ],
    rules: {
        'import/group-exports': 0,
        'node/no-sync': 0,
        'node/no-unpublished-import': 0,
        'react/display-name': 0,
    },
};
