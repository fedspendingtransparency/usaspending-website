const merge = require('webpack-merge');
const webpack = require('webpack');
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
        nodeEnv: "production",
        namedChunks: false,
        namedModules: false,
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        providedExports: true,
        removeAvailableModules: true,
        usedExports: true,
        concatenateModules: true,
        noEmitOnErrors: true,
        checkWasmTypes: true,
        runtimeChunk: "single",
        minimize: true,
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
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production") // indicate to libraries that this is in prod mode (which may affect their behavior for debugging)
        }),
        new MiniCssExtractPlugin({
            filename: "[contenthash].css"
        })
    ]
});
