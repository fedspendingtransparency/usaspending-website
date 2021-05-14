const merge = require('webpack-merge').merge;
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
    performance: {
        hints: 'warning'
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
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
                            sassOptions: {
                                includePaths: ["./src/_scss", "./node_modules"]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                USASPENDING_API: process.env.USASPENDING_API
                    ? JSON.stringify(process.env.USASPENDING_API)
                    : JSON.stringify("https://api.usaspending.gov/api/"),
                MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
                    ? JSON.stringify(process.env.MAPBOX_TOKEN)
                    : JSON.stringify("")
            }
        }),
        new BundleAnalyzerPlugin()
    ]
});
