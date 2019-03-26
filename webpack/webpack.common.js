const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "main.js"
    },
    // use the optimization configuration property
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["node_modules", path.resolve(__dirname, "../src/_scss")]
    },
    stats: {
        colors: true
    },
    module: {
        noParse: /(mapbox-gl)\.js$/,
        rules: [
            {
                test: /\.js$|jsx$/,
                exclude: /node_modules/,
                options: { presets: ["es2015"] },
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader", options: { url: false, sourceMap: true } },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            includePaths: ["./src/_scss", "./node_modules"]
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|png|svg|ico|gif|jpg)$/,
                loader: "file-loader",
                query: {
                    name: "[path][name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist", "cache"], {
            root: path.resolve(__dirname, "../")
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
            // copy the index.html file out of /src into /public and update with the current JS files
            inject: false,
            template: path.resolve(__dirname, "../src/index.html"),
            chunksSortMode: "none"
        }),
        new MiniCssExtractPlugin(),
        new webpack.HashedModuleIdsPlugin() // so that file hashes don't change unexpectedly
    // new GitHashPlugin()
    ]
};
