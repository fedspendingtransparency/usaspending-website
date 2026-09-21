const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                node: "22.14",
                browsers: ["last 2 versions", "not dead", "not ie <= 11"]
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
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-optional-chaining",
    ["polyfill-corejs3", { method: "entry-global", version: "3.50" }]
];

module.exports = {
    presets,
    plugins
};
