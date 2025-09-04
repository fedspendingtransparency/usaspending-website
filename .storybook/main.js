const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export default {
  "stories": ["./stories/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-styling-webpack",
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
  webpack: (config, options) => {
      options.cache.set = () => Promise.resolve();
      return config;
  },
  webpackFinal: async (config) => {
    config.plugins.push(new MiniCssExtractPlugin());
    config.module.rules.push({
            test: /\.js$|jsx$/,
            exclude: /node_modules\.*/,
            loader: "babel-loader"
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: "css-loader"
                }
            ]
        },
        {
            include: /\.(eot|ttf|woff|woff2|png|svg|ico|gif|jpg|pdf|webp)$/,
            loader: 'file-loader',
            type: 'javascript/auto',
            options: {
                name: '[path][name].[ext]'
            }
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader",
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
    });
    return config;
  }
};