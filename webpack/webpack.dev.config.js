const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common');

module.exports = merge(common, {
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development') // indicate to libraries that this is in prod mode (which may affect their behavior for debugging)
        })
    ],
    devtool: 'eval',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        host: '0.0.0.0', // this allows VMs to access the server
        port: 3000,
        disableHostCheck: true
    }
});
