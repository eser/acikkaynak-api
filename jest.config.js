const jestConfig = {
    testEnvironment: 'node',
    roots: [
        '<rootDir>/src'
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|mjs)$',
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'mjs'
    ],
    coverageDirectory: './tmp/coverage',
};

module.exports = jestConfig;
