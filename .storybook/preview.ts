import '../src/app.postcss'

import type { Preview } from "@storybook/svelte";
import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'white',
      disable: true,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    // darkMode: {
    //   darkClass: 'dark',
    //   lightClass: 'light',
    //   classTarget: 'html',
    //   // Override the default dark theme
    //   dark: { ...themes.dark, appBg: 'black' },
    //   // Override the default light theme
    //   light: { ...themes.normal, appBg: 'white' }
    // },
  },
};

export default preview;
