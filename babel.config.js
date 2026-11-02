const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                ie: "10",
                node: "10"
            }
        }
    ],
    "@babel/preset-react"
];

const plugins = [
    // 'babel-plugin-react-compiler',
    [
        "module-resolver",
        {
            root: ["src/js"]
        }
    ],
    "@babel/plugin-transform-runtime",
    "react-hot-loader/babel"
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
