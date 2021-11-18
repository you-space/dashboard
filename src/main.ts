import { createApp as baseCreateApp } from "vue";
import { createRouter } from "./router";
import App from "./App.vue";
import { YPlugin } from "./types";
import { createServer } from "./mirage/server";
import { createStore, key } from "./store";
import middleware from "./router/middleware";
import "./styles/index.scss";

const { DEV, VITE_USE_PROXY } = import.meta.env;

if (DEV && !VITE_USE_PROXY) {
    createServer();
}

export async function createApp() {
    const app = baseCreateApp(App);
    const router = createRouter();
    const store = createStore();

    app.use(router);
    app.use(store, key);

    const context = {
        app,
        router,
        store,
    };

    router.beforeEach((to, from) => middleware({ ...context, to, from }));

    const modules = import.meta.globEager("./plugins/*.ts");

    const plugins: YPlugin[] = Object.values(modules).map((p) => p.default);

    await Promise.all(plugins.map((plugin) => plugin(context)));

    return { app, router };
}

createApp().then(({ app }) => app.mount("#app"));
