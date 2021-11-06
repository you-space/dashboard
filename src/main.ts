import { createApp as baseCreateApp } from "vue";
import { createRouter } from "./router";
import App from "./App.vue";
import { YPlugin } from "./types";
import { createServer } from "./mirage/server";
import { createStore, key } from "./store";

if (process.env.NODE_ENV === "development") {
    createServer();
}

export async function createApp() {
    const app = baseCreateApp(App);
    const router = createRouter();
    const store = createStore();

    app.use(router);
    app.use(store, key);

    const modules = import.meta.globEager("./plugins/*.ts");
    const plugins: YPlugin[] = Object.values(modules).map((p) => p.default);

    await Promise.all(plugins.map((plugin) => plugin({ app, router, store })));

    return { app, router };
}

createApp().then(({ app }) => app.mount("#app"));
