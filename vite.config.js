import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.js',
      name: 'Lightbox',
      formats: ['es']
    },
    rollupOptions: {
      external: ['focus-trap']
    }
  }
})
