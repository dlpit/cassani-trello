import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  // Cho phép Vite sử dụng được process.env, mặc đinh phải dùng import.meta.env
  define: {
    'process.env': process.env
  },
  plugins: [
    react(),
    svgr()
  ],
  base: '/', // Uncomment and set to root path for Vercel deployment Uncomment and set to root path for Vercel deployment
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
