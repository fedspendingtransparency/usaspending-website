

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../.storybook/stories/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-vite"
};
export default config;