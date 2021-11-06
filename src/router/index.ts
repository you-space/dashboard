import { createRouter as BaseCreateRouter, createWebHistory } from "vue-router";

import routes from "./routes";

export function createRouter() {
    const router = BaseCreateRouter({
        history: createWebHistory(),
        routes,
    });

    return router;
}
