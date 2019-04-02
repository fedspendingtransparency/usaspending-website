const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                styles: {
                    // all css in one file
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            cache: true
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css'
        })
        // try using manual minimizer for js
    ]
});
