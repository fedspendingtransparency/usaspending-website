// TODO: [DEV-5897] USAS Front End Test Configuration Update: Functional Components & Redux
// Update test configuration to make testing react functional components easier.

module.exports = {
    rootDir: ".",
    testRegex: "(tests|scripts)/.*-(test)\\.jsx?$",
    verbose: true,
    bail: false,
    collectCoverage: true,
    // coverageThreshold: {
    //     global: {
    //         branches: 80,
    //         functions: 80,
    //         lines: 80,
    //         statements: -10
    //     }
    // },
    collectCoverageFrom: [
        "src/js/containers/**/*.{js,jsx}",
        "src/js/redux/reducers/**/*.{js,jsx}",
        "src/js/helpers/**/*.{js,jsx}",
        "!node_modules/**",
        "!public/**"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
        "^(data-transparency-ui)$": "<rootDir>/node_modules/data-transparency-ui",
        "\\.(css|less|scss)$": "<rootDir>/tests/testResources/stylesStub.js",
        ".*GlobalConstants$": "<rootDir>/tests/testResources/mockGlobalConstants.js",
        '@test-utils': "<rootDir>/tests/testResources/test-utils.js"
    },
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
    transform: {
        "^.+\\.jsx$|js$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(data-transparency-ui))"
    ],
    modulePaths: ["<rootDir>/tests/testResources"]
};
