const path = require('path');
const webpack = require('webpack');

const common = require('./common');

const loaders = [
    common.loaders.babel,
    common.loaders.style,
    common.loaders.files
];

// clone the common plugin array
const plugins = Array.from(common.commonConfig.plugins);
const customPlugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development') // indicate to libraries that this is in prod mode (which may affect their behavior for debugging)
    })
];

module.exports = Object.assign({}, common.commonConfig, {
    module: Object.assign({}, common.commonConfig.module, {
        loaders
    }),
    plugins: plugins.concat(customPlugins),
    devtool: 'eval',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        host: '0.0.0.0', // this allows VMs to access the server
        port: 3000
    }
});
