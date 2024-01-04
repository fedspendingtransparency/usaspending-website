const { merge } = require('webpack-merge');
const dev = require('./webpack.dev.config');

module.exports = merge(dev, {
    devtool: "inline-source-map",
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    quietDeps: true
                }
            }
        }
    }
});
