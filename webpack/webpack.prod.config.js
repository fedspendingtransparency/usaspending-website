const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./common');

const styleLoader = {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    includePaths: ['./src/_scss']
                }
            }
        ]
    })
};

const loaders = [
    common.loaders.babel,
    styleLoader,
    common.loaders.files
];

// clone the common plugin array
const plugins = Array.from(common.commonConfig.plugins);
const customPlugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production') // indicate to libraries that this is in prod mode (which may affect their behavior for debugging)
    }),
    new webpack.optimize.UglifyJsPlugin({ // compress the bundle
        compress: {
            warnings: false
        },
        sourceMap: false
    })
];

module.exports = Object.assign({}, common.commonConfig, {
    module: Object.assign({}, common.commonConfig.module, {
        loaders
    }),
    plugins: plugins.concat(customPlugins)
});
