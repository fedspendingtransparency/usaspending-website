const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production') // indicate to libraries that this is in prod mode (which may affect their behavior for debugging)
        }),
        new ParallelUglifyPlugin({
            uglifyJS: {
                compress: {
                    warnings: false
                },
                sourceMap: false
            }
        })
    ]
});
