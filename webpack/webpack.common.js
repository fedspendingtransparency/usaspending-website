const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitHashPlugin = require('./plugins/git-hash-plugin');

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        vendor: ['mapbox-gl/dist/mapbox-gl', 'lodash', 'moment', 'commonmark', 'immutable', 'react'],
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
            path.resolve(__dirname, '../node_modules')
        ]
    },
    module: {
        noParse: /(mapbox-gl)\.js$/,
        loaders: [
            {
                test: /\.jsx?$/,
                include: /src(\/|\\)js/,
                exclude: /node_modules/,
                loader: 'babel-loader', // the babel loader tells webpack to compile JS/JSX files using Babel
                query: {
                     // after initial load, subsequent builds draw from a cache (in dev only) to reduce build time
                    cacheDirectory: path.resolve(__dirname, '../cache/'),
                    compact: true
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: () => {
                                    if (process.env.NODE_ENV === 'production') {
                                        return false;
                                    }
                                    return true;
                                },
                                minimize: () => {
                                    if (process.env.NODE_ENV === 'production') {
                                        return true;
                                    }
                                    return false;
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: ['./src/_scss'],
                                sourceMap: () => {
                                    if (process.env.NODE_ENV === 'production') {
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        }
                    ]
                })
            },
            {
                include: /src(\/|\\)(fonts|graphics|img)/,
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
        new ExtractTextPlugin({
            filename: 'css/style.[hash].css',
            allChunks: true
        }),
        new GitHashPlugin(),
        new HtmlWebpackPlugin({ // copy the index.html file out of /src into /public and update with the current JS files
            inject: false,
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ]
};
