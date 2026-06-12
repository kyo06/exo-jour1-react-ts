import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],  
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        manualChunks(id) {
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'reactVendor';
          }
          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
            return 'reduxVendor';
          }
        }
      }
    }
  },
  resolve: {
    alias: [
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@services', replacement: resolve(__dirname, 'src/services') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
      { find: '@types', replacement: resolve(__dirname, 'src/types') },
      { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@', replacement: resolve(__dirname, 'src') }
    ]
  }
})
