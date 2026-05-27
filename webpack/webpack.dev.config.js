import webpack from "webpack";
import path from 'path';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import common from './webpack.common.mjs';

const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

module.exports = merge(common, {
    mode: "development",
    stats: { warnings: false },
    devtool: "eval",
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        host: "0.0.0.0", // this allows VMs to access the server
        port: 3000,
        allowedHosts: "all",
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, "public")
        },
        client: {
            overlay: false
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader", options: { url: false, sourceMap: true } },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: ["./src/_scss", "./node_modules"]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(), // Webpack bundle volume analysis
        new webpack.DefinePlugin({
            'process.env': {
                USASPENDING_API: process.env.USASPENDING_API
                    ? JSON.stringify(process.env.USASPENDING_API)
                    : JSON.stringify("https://api.usaspending.gov/api/"),
                MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
                    ? JSON.stringify(process.env.MAPBOX_TOKEN)
                    : JSON.stringify("")
            }
        })
    ]
});
