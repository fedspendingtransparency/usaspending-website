const presets = [
    [
        ["@babel/preset-react", { "runtime": "automatic" }],
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
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-object-rest-spread",
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-optional-chaining",
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel"
];

export default {
    presets,
    plugins
};
