import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { GitRevisionPlugin } from 'git-revision-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __dirname = import.meta.dirname;
const __filename = import.meta.filename;
// const gitRevisionPlugin = new GitRevisionPlugin({ branch: true }); // 'rev-parse HEAD' is default command to find latest commit

// console.log("Commit Hash for this build: ", gitRevisionPlugin.commithash());
// console.log("Branch for this build: ", gitRevisionPlugin.branch());
console.log("GA_TRACKING_ID", process.env.GA_TRACKING_ID);

export default {
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
        extensions: [".js", ".jsx", ".md", ".mdx"],
        modules: ["node_modules", path.resolve(__dirname, "../src/_scss")],
        fallback: { querystring: import.meta.resolve("querystring-es3") },
        alias: {
            lodash: 'lodash-es'
        }
    },
    optimization: {
        splitChunks: { chunks: 'all' },
        usedExports: true
    },
    module: {
        parser: {
            javascript: {
                importMeta: false,
            },
        },
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
            // file-loader rules are being deprecated; https://webpack.js.org/guides/asset-modules/
            {
                include: /\.(eot|ttf|woff|woff2|png|svg|ico|gif|jpg|pdf|webp)$/,
                loader: 'file-loader',
                type: 'javascript/auto',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(json)$/,
                type: 'javascript/auto',
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.mdx?$/,
                use: [
                    // Note that Webpack runs right-to-left: `@mdx-js/loader` is used first, then
                    // `babel-loader`.
                    { loader: 'babel-loader', options: {} },
                    {
                        loader: '@mdx-js/loader',
                        /** @type {import('@mdx-js/loader').Options} */
                        options: {}
                    }
                ]
            }
        ]
    },
    devServer: {
        static: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new GitRevisionPlugin({
            branch: true
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.ejs"),
            chunksSortMode: "none",
            templateParameters: {
                GA_TRACKING_ID: process.env.GA_TRACKING_ID || '',
                USE_GTM: (
                    process.env.ENV === 'qat' ||
                    process.env.ENV === 'sandbox'
                ),
                GTM_ID: process.env.GTM_ID || '',
                IS_PROD: (
                    process.env.ENV === 'prod'
                )

            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '*.xml',
                    to: path.resolve(__dirname, "../public"),
                    context: path.resolve(__dirname, '../'),
                    noErrorOnMissing: true
                },
                {
                    from: '*.xml',
                    to: path.resolve(__dirname, "../public"),
                    context: path.resolve(__dirname, '../'),
                    noErrorOnMissing: true
                },
                {
                    from: 'robots.txt',
                    to: path.resolve(__dirname, "../public"),
                    context: path.resolve(__dirname, '../'),
                    noErrorOnMissing: true
                },
                {
                    from: 'redirect-config.json',
                    to: path.resolve(__dirname, "../public"),
                    context: path.resolve(__dirname, '../'),
                    noErrorOnMissing: true
                }
            ]
        }),
        new webpack.DefinePlugin({
            'process.env.ENV': process.env.ENV ? JSON.stringify(process.env.ENV) : JSON.stringify('qat'),
            'process.env.FILES_SERVER_BASE_URL': JSON.stringify(process.env.FILES_SERVER_BASE_URL || '')
        })
    ]
};
