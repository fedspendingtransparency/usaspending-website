const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                ie: "10",
                node: "current"
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
    "react-hot-loader/babel"
];

module.exports = {
    presets,
    plugins
};
