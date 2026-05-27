import { merge } from 'webpack-merge';
import dev from './webpack.dev.config';

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
