import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const { API_PROXY_URL } = loadEnv(mode, process.cwd());

    const proxyUrl = API_PROXY_URL || "http://localhost:3333";

    return {
        base: mode === "production" ? "/{{app-base-url}}/" : "/",
        plugins: [vue()],
        resolve: {
            alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
        },
        server: {
            proxy: {
                "^/api/.*": {
                    target: `${proxyUrl}/api`,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    };
});
