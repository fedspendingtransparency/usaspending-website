const merge = require('webpack-merge');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    stats: {
        assets: true,
        chunks: true,
        builtAt: true,
        cached: true,
        version: true,
        warnings: true
    },
    // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        sideEffects: true,
        providedExports: true,
        removeAvailableModules: true,
        usedExports: true,
        concatenateModules: true,
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity, // default is 3
            cacheGroups: {
                styles: {
                    // all css in one file -- https://github.com/webpack-contrib/mini-css-extract-plugin
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 750000
        }),
        new webpack.debug.ProfilingPlugin({
            outputPath: "../stats.json"
        })
    ]
});
