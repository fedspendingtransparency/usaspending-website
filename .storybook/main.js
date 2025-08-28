module.exports = {
  "stories": ["./stories/*.mdx", "./stories/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-styling-webpack"
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};