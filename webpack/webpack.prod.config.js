const { merge } = require('webpack-merge');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: false } },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: '[id].css'
        })
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         USASPENDING_API: process.env.USASPENDING_API
        //             ? JSON.stringify(process.env.USASPENDING_API)
        //             : JSON.stringify("https://api.usaspending.gov/api/"),
        //         MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
        //             ? JSON.stringify(process.env.MAPBOX_TOKEN)
        //             : JSON.stringify("")
        //     }
        // })
    ]
});
