import { RouteRecordRaw } from "vue-router";

const components = import.meta.glob("../pages/**/*.vue");

const pages = Object.entries(components)
    .filter(([filename]) => filename.split("/").pop()?.charAt(0) !== "-")
    .filter(([filename]) => !filename.includes("components"))
    .map(([filename, component]) => {
        let path = filename
            .replace("../pages", "")
            .replace(/index/i, "")
            .replace(".vue", "")
            .replace(/\[(.*?)\]/g, ":$1")
            .toLowerCase();

        if (path === "/404") {
            path = ":pathMatch(.*)*";
        }

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
