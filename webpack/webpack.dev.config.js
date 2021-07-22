const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        host: "0.0.0.0", // this allows VMs to access the server
        port: 3000,
        disableHostCheck: true,
        historyApiFallback: true,
        compress: true,
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    'postcss-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: ["./src/_scss", "./node_modules"]
                            }
                        }
                    }
                ]
            }
            // {
            //     test: /\.scss$/,
            //     use: [
            //         { loader: MiniCssExtractPlugin.loader },
            //         { loader: "css-loader", options: { url: false, sourceMap: true } },
            //         {
            //             loader: "sass-loader",
            //             options: {
            //                 sourceMap: true,
            //                 includePaths: ["./src/_scss", "./node_modules"]
            //             }
            //         }
            //     ]
            // }
            // {
            //     test: /\.(scss|css)$/,
            //     exclude: /node_modules\.*/,
            //     use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            // }
        ]
    },
    plugins: [
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
        // new webpack.HotModuleReplacementPlugin()
    ]
});
