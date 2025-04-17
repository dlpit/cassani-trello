import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Cho phép Vite sử dụng được process.env, mặc đinh phải dùng import.meta.env
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  base: '/',
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
