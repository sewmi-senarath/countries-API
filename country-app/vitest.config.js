// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.test.{js,jsx}'],
    exclude: ['node_modules', 'dist'],
  }
});