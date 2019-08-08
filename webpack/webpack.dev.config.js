const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "development",
    devtool: "eval",
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        host: "0.0.0.0", // this allows VMs to access the server
        port: 3000,
        disableHostCheck: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: process.env.USASPENDING_API
                    ? JSON.stringify(JSON.parse(process.env.USASPENDING_API).URL)
                    : JSON.stringify("http://localhost:8000/api/"),
                IS_DEV: JSON.stringify('true')
            }
        })
    ]
});
