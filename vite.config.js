import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your back-end server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite path if needed
      },
    },
  },
})