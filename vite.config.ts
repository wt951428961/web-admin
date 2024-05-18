import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mockDevServerPlugin from "vite-plugin-mock-dev-server";

export default defineConfig({
    plugins: [
        react(),
        mockDevServerPlugin(),
    ],

    server: {
        // 需在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并进行 mock
        proxy: {
            // '^/api': {
            //     target: '',
            // },
            '^/api':{
                target: 'http://8.149.132.162:7162'
            }
        },
    },
})