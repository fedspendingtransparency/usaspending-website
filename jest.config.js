module.exports = {
    testMatch: ["**/?(*)-(test).js?(x)"],
    collectCoverage: true,
    collectCoverageFrom: ["!**/node_modules/**"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    },
    setupFilesAfterEnv: ["<rootDir>/__tests__/setup.js"],
    moduleNameMapper: {
        "(.*).scss$": "<rootDir>/__tests__/stylesStub.js"
    }
};
