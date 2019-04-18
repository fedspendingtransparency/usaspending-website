const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({ branch: true }); // 'rev-parse HEAD' is default command to find latest commit

console.log("Commit Hash for this build: ", gitRevisionPlugin.commithash());
console.log("Branch for this build: ", gitRevisionPlugin.branch());

const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: {
        app: "./index.js"
    },
    output: {
    // https://webpack.js.org/guides/caching/
        filename: "[name].[contenthash].js"
    },
    context: path.resolve(__dirname, "../src"),
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["node_modules", path.resolve(__dirname, "../src/_scss")]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        noParse: /(mapbox-gl)\.js$/,
        rules: [
            {
                test: /\.js$|jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader", options: { url: false, sourceMap: !isProduction } },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: !isProduction,
                            includePaths: ["./src/_scss", "./node_modules"]
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|ico|gif|jpg)$/,
                loader: "file-loader",
                query: {
                    name: "img/[name].[ext]"
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2|)$/,
                loader: "file-loader",
                query: {
                    name: "font/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../")
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            chunksSortMode: "none"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new webpack.HashedModuleIdsPlugin() // so that file hashes don't change unexpectedly
    ]
};
