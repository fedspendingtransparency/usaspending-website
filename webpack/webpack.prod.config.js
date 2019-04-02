const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    // all css in one file
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new OptimizeCssAssetsPlugin(),
        new CompressionPlugin({
            cache: true
        })
        // try using manual minimizer for js
    ]
});
