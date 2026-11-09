const presets = [
    // targets come from the "browserslist" field in package.json
    "@babel/preset-env",
    [
        "@babel/preset-react",
        {
            // Babel 8 defaults this to true whenever NODE_ENV is unset (as in `npm run prod`),
            // emitting jsxDEV calls that don't exist in React's production runtime.
            development: process.env.NODE_ENV === "development"
        }
    ]
];

const plugins = [
    // 'babel-plugin-react-compiler',
    [
        "module-resolver",
        {
            root: ["src/js"]
        }
    ],
    "@babel/plugin-transform-runtime"
];

// Expands `require("core-js")` in the app entry into targeted imports.
// Scoped to app.jsx because it makes transform-runtime emit @babel/runtime-corejs3 helpers.
const overrides = [
    {
        test: "./src/js/app.jsx",
        plugins: [
            [
                "polyfill-corejs3",
                {
                    method: "entry-global",
                    version: "3",
                    proposals: true
                }
            ]
        ]
    }
];

module.exports = {
    presets,
    plugins,
    overrides
};
