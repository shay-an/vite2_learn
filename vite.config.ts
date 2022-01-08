import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 50,
    rollupOptions:{
      output:{
        // manualChunks(id) {
        //   // if (id.includes('swiper') || id.includes('lodash') || id.includes('element-plus')) {
        //   //   return 'sw-';
        //   // }
        //   if (id.endsWith('.vue')) {
        //     return 'ccaa-';
        //   }
        //   if (id.includes('node_modules')) {
        //     return 'cc-';
        //   }
        // }
      }
    }
  }
})
