/**
 * git-hash-plugin.js
 * Created by Kevin Li 7/13/17
 */

const spawnSync = require('child_process').spawnSync;

function GitHashPlugin() {}

GitHashPlugin.prototype.apply = (compiler) => {
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {
            const gitCommand = spawnSync('git', ['rev-parse', 'HEAD']);
            let gitHash = 'unknown';
            if (gitCommand.output[1].length > 0) {
                // successfully got the hash
                gitHash = gitCommand.output[1].toString().substring(0, 7);
            }

            htmlPluginData.assets.gitHash = gitHash;
            callback(null, htmlPluginData);
        });
    });
};

module.exports = GitHashPlugin;
