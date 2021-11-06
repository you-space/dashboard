import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    // server: {
    //     proxy: {
    //         "^/api/.*": {
    //             target: "http://localhost:3333/api/",
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, ""),
    //         },
    //     },
    // },
});
