const merge = require('webpack-merge').merge;
const dev = require('./webpack.dev.config');

module.exports = merge(dev, {
    devtool: "inline-source-map"
});
