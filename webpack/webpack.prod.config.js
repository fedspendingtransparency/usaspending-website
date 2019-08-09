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
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader", options: { url: false, sourceMap: false } },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false,
                            includePaths: ["./src/_scss", "./node_modules"]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 300000
        }),
        new webpack.DefinePlugin({
            'process.env': {
                API: process.env.API
                    ? JSON.stringify(process.env.API)
                    : JSON.stringify("http://localhost:8000/api/"),
                MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
                    ? JSON.stringify(process.env.MAPBOX_TOKEN)
                    : JSON.stringify(""),
                GA_TRACKING_ID: process.env.GA_TRACKING_ID
                    ? JSON.stringify(process.env.GA_TRACKING_ID)
                    : JSON.stringify(""),
                IS_DEV: JSON.stringify('false')
            }
        })
    ]
});
