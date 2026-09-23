import { fileURLToPath, URL } from 'node:url';
import type { StorybookConfig } from '@storybook/vue3-vite';
import type { PluginOption } from 'vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: [],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.app.json',
      },
    },
  },
  viteFinal: async (viteConfig) => {
    const storybookConfig = mergeConfig(viteConfig, {
      resolve: {
        alias: [
          {
            find: '@/api/supabase',
            replacement: fileURLToPath(new URL('./mocks/supabase.ts', import.meta.url)),
          },
          {
            find: 'vue3-ytframe',
            replacement: fileURLToPath(new URL('./mocks/vue3-ytframe.ts', import.meta.url)),
          },
          {
            find: '@',
            replacement: fileURLToPath(new URL('../src', import.meta.url)),
          },
        ],
      },
    });

    storybookConfig.plugins = storybookConfig.plugins?.filter((plugin: PluginOption) => {
      if (!plugin || Array.isArray(plugin) || typeof plugin !== 'object' || !('name' in plugin)) {
        return true;
      }

      const pluginName = typeof plugin.name === 'string' ? plugin.name : '';
      return !['vite-plugin-vue-devtools', 'vite-bundle-analyzer'].includes(pluginName);
    });

    return storybookConfig;
  },
};

export default config;
