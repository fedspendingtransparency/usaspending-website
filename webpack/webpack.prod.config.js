const merge = require('webpack-merge');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "production",
    stats: {
        assets: true,
        chunks: true,
        builtAt: true,
        cached: true,
        version: true,
        warnings: true
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                styles: {
                    // all css in one file -- https://github.com/webpack-contrib/mini-css-extract-plugin
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 300000
        })
    ]
});
