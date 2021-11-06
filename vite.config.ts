import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [
            {
                find: "assets",
                replacement: "/api/v1/assets",
            },
            {
                find: "pages",
                replacement: "/api/v1/admin/dashboard/pages",
            },
        ],
    },
    server: {
        proxy: {
            "^/api/.*": {
                target: "http://localhost:3333/api/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
