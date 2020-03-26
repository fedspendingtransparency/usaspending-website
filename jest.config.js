module.exports = {
    rootDir: ".",
    testRegex: "(tests|scripts)/.*-(test)\\.jsx?$",
    verbose: true,
    bail: false,
    collectCoverage: false,
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
        "!node_modules/**",
        "!public/**"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
        "^(data-transparency-ui)$": "<rootDir>/node_modules/data-transparency-ui",
        "\\.(css|less|scss)$": "identity-obj-proxy",
        ".*GlobalConstants$": "<rootDir>/tests/testResources/mockGlobalConstants.js"
    },
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
    transform: {
        "^.+\\.jsx$|js$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(data-transparency-ui))"
    ]
};
