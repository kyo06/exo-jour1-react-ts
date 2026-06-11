import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
