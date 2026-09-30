/// <reference types="vitest/config" />

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    analyzer({
      analyzerMode: 'server',
      openAnalyzer: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.ts'],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/components/{Button,CardApp,FooterApp,HeaderApp,Inputs,Loader,Modals,ReviewItem,SingleSliderList}/**/*.{ts,vue}',
        'src/views/favorite/FavoriteList.vue',
        'src/views/home/components/{HeroCard,HeroSlider}.vue',
      ],
      exclude: ['src/**/*.test.ts', 'src/**/*.stories.ts'],
    },
  },
})
