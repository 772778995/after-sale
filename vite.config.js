// import { fileURLToPath, URL } from 'node:url'
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var _b;
    var command = _a.command, mode = _a.mode;
    var env = loadEnv(mode, process.cwd());
    return {
        plugins: [vue()],
        base: './',
        // publicDir: './',
        resolve: {
            alias: {
                '@': path.resolve('./src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";',
                },
            },
        },
        server: {
            proxy: (_b = {},
                _b[env.VITE_APP_BASE_API] = {
                    target: env.VITE_SERVE,
                    // 需要代理
                    changeOrigin: true,
                    // 路径重写
                    rewrite: function (path) { return path.replace(/^\/api^\/v2/, ''); },
                },
                _b),
        },
    };
});
