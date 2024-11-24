/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // Vitest global fonksiyonlarını etkinleştirir
    environment: 'jsdom', // JSDOM ortamı sağlar
    setupFiles: './setupTests.js', // Test ortamı ayarları
  },
});
