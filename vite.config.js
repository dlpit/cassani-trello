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
  base: '/', // This is important for absolute asset paths
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  },
  build: {
    // Ensure assets are referenced with absolute paths
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Force assets to use absolute paths
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})
