const presets = [
    [
        "@babel/preset-env",
        {
            useBuiltIns: "entry",
            corejs: {
                version: 3,
                proposals: true
            },
            targets: {
                ie: "10",
                node: "10"
            }
        }
    ],
    "@babel/preset-react"
];

const plugins = [
    [
        "module-resolver",
        {
            root: ["src/js"]
        }
    ],
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel"
];

module.exports = {
    presets,
    plugins
};
