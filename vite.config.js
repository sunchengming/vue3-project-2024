import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
// base:'/' //与roter中的配置import.meta.env.BASE_URL一样
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        silenceDeprecations:["legacy-js-api"]
      }
    }
  },
  server:{
    port:8080,
    // proxy:{
    //   '/api': {
    //     // 后台地址
    //     target: 'http://big-event-vue-api-t.itheima.net',
    //     changeOrigin: true
    //   }
    // } 
  }
  
});
