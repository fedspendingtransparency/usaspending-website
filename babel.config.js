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
    "react-hot-loader/babel"
];

if (process.env.NODE_ENV === 'test') {
    // regenerator-runtime is undefined in tests unless we include this plugin:
    plugins.push(
        "@babel/plugin-transform-runtime"
    );
}
module.exports = {
    presets,
    plugins
};
