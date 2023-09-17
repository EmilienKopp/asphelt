import type { StorybookConfig } from "@storybook/svelte-vite";
import addons from "@storybook/addons";

// const channel = addons.useChannel({'DARK_MODE': isDark => document.querySelector('html')?.classList.toggle('dark', isDark)});

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // 'storybook-dark-mode',
  ],
  framework: {
    name: "@storybook/svelte-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
