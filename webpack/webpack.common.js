const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const GitHashPlugin = require('./plugins/git-hash-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        // no longer need to separate the app from the vendor. Source: https://webpack.js.org/concepts/entry-points/#separate-app-and-vendor-entries
        // vendor: ['mapbox-gl/dist/mapbox-gl', 'lodash', 'moment', 'commonmark', 'immutable', 'react'],
        app: './entry.js'
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        publicPath: '',
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/bundle.[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, '../src/js'),
            path.resolve(__dirname, '../node_modules'),
            path.resolve(__dirname, '../src/_scss')
        ]
    },
    module: {
        noParse: /(mapbox-gl)\.js$/,
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // the babel loader tells webpack to compile JS/JSX files using Babel
                query: {
                    // after initial load, subsequent builds draw from a cache (in dev only) to reduce build time
                    cacheDirectory: path.resolve(__dirname, '../cache/'),
                    compact: true
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            // shouldn't need this
            // {
            //     test: /\.scss$/,
            //     use: [
            //         "style-loader",
            //         MiniCssExtractPlugin.loader,
            //         "css-loader",
            //         "sass-loader"
            //     ]
            // },
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             {
            //                 loader: 'css-loader',
            //                 options: {
            //                     sourceMap: () => {
            //                         if (process.env.NODE_ENV === 'production') {
            //                             return false;
            //                         }
            //                         return true;
            //                     },
            //                     minimize: () => {
            //                         if (process.env.NODE_ENV === 'production') {
            //                             return true;
            //                         }
            //                         return false;
            //                     }
            //                 }
            //             },
            //             {
            //                 loader: 'sass-loader',
            //                 options: {
            //                     includePaths: ['./src/_scss', './node_modules'],
            //                     sourceMap: () => {
            //                         if (process.env.NODE_ENV === 'production') {
            //                             return false;
            //                         }
            //                         return true;
            //                     }
            //                 }
            //             }
            //         ]
            //     })
            // },
            {
                include: /src(\/|\\)(fonts|graphics|img|data)/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['public', 'cache'], {
            root: path.resolve(__dirname, '../')
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new miniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[chunkhash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[chunkhash].css',
        }),
        new GitHashPlugin(),
        new HtmlWebpackPlugin({ // copy the index.html file out of /src into /public and update with the current JS files
            inject: false,
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html'
        })
        // no longer need to separate the app from the vendor. Source: https://webpack.js.org/concepts/entry-points/#separate-app-and-vendor-entries
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // })
    ]
};
