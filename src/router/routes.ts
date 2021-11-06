import { RouteRecordRaw } from "vue-router";

const components = import.meta.glob("../pages/**/*.vue");

const pages = Object.entries(components)
    .filter(([filename]) => filename.split("/").pop()?.charAt(0) !== "-")
    .map(([filename, component]) => {
        const path = filename
            .replace("../pages", "")
            .replace(/index/i, "")
            .replace(".vue", "")
            .replace(/_/g, ":")
            .toLowerCase();

        return {
            path,
            component,
            props: true,
        };
    });

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("../AppLayout.vue"),
        children: pages,
    },
];

export default routes;
