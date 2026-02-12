import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      // где лежат ваши svg
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // формат id у символов в спрайте
      symbolId: 'icon-[name]',
      svgoOptions: {
        plugins: [
          'preset-default',
          // пример: сохранить viewBox (часто важно для масштабирования)
          { name: 'removeViewBox', active: false },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
