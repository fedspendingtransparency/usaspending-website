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
