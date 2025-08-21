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
    "@babel/plugin-transform-object-rest-spread",
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-optional-chaining",
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel"
];

module.exports = {
    presets,
    plugins
};
