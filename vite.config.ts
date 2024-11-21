import {ConfigEnv, defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "node:path";
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import visualizer from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({mode}: ConfigEnv) => {
  return {
    plugins: [
        viteCompression({
          verbose: true, // 在控制台中压缩结果
          disable: false,
          threshold: 1024,
          algorithm: 'gzip',
          ext: '.gz',
          deleteOriginFile: false
        }),
        vue(),
        createSvgIconsPlugin({
          // 指定需要缓存的图标文件夹
          iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
          symbolId: 'icon-[dir]-[name]'
        }),
        AutoImport({
          imports: ['vue', 'vue-router', 'pinia'],
          resolvers: [ElementPlusResolver()],
          dts: 'src/types/auto-imports.d.ts'
        }),
        Components({
          resolvers:[ElementPlusResolver()],
          dts: 'src/types/components.d.ts'
        }),
        visualizer({
          open: true,
          filename: 'visualizer.html'
        })
    ],
    resolve: {
      alias: {
        '@': path.resolve("./src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      },
      postcss: {
        plugins: [
            tailwindcss, autoprefixer
        ]
      }
    },
    build: {
      rollupOptions: {
        // 打包文件分类输出
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        },
        // 最小化拆分包，将需要分离的包单独打包
        manualChunks(id: any) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    },
    server: {
      port: 99,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: `${loadEnv(mode, process.cwd()).VITE_SERVER}`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        },
        '/wapi': {
          target: `${loadEnv(mode, process.cwd()).VITE_MUSIC_SERVER}`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/wapi/, '')
        }
      }
    }
  }
})
