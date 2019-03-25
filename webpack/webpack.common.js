const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "../public"),
        publicPath: "",
        filename: "main.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        modules: ["node_modules"]
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
                loader: "babel-loader" // the babel loader tells webpack to compile JS/JSX files using Babel
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|png|svg|ico|gif|jpg)$/,
                // include: /src(\/|\\)(fonts|graphics|img)/,
                loader: "file-loader",
                query: {
                    name: "[path][name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["public", "cache"], {
            root: path.resolve(__dirname, "../")
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        // new GitHashPlugin(),
        new HtmlWebpackPlugin({
            // copy the index.html file out of /src into /public and update with the current JS files
            inject: false,
            template: path.resolve(__dirname, "../src/index.html"),
            filename: "index.html",
            chunksSortMode: "none"
        })
    ]
};
