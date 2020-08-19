const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({ branch: true }); // 'rev-parse HEAD' is default command to find latest commit

console.log("Commit Hash for this build: ", gitRevisionPlugin.commithash());
console.log("Branch for this build: ", gitRevisionPlugin.branch());
console.log("GA_TRACKING_ID", process.env.GA_TRACKING_ID);

module.exports = {
    entry: {
        app: "./index.js"
    },
    output: {
    // https://webpack.js.org/guides/caching/
        publicPath: "/",
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "../public")
    },
    context: path.resolve(__dirname, "../src"),
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["node_modules", path.resolve(__dirname, "../src/_scss")]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // all imported code from node_modules is a single file
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 20
                },
                // code shared between at least 2 modules, is put into a common chunk file
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    module: {
        noParse: /(mapbox-gl)\.js$/,
        rules: [
            {
                test: /\.js$|jsx$/,
                exclude: /node_modules\.*/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                include: /\.(eot|ttf|woff|woff2|png|svg|ico|gif|jpg|pdf)$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(json)$/,
                type: 'javascript/auto',
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["public"], {
            root: path.resolve(__dirname, "../")
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.ejs"),
            chunksSortMode: "none",
            templateParameters: {
                GA_TRACKING_ID: process.env.GA_TRACKING_ID || ''
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
        new CopyWebpackPlugin([
            {
                from: '*.xml',
                to: path.resolve(__dirname, "../public"),
                context: path.resolve(__dirname, '../')
            },
            {
                from: 'robots.txt',
                to: path.resolve(__dirname, "../public"),
                context: path.resolve(__dirname, '../')
            }
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                ENV: process.env.ENV
                    ? JSON.stringify(process.env.ENV)
                    : JSON.stringify('dev')
            }
        })
    ]
};
