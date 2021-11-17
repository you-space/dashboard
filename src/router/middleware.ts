import { MiddlewareContext } from "@/types";

export default async function middleware({ to, store }: MiddlewareContext) {
    if (!store.state.auth.authenticated) {
        await store.dispatch("auth/login");
    }

    const { authenticated } = store.state.auth;

    const { path } = to;

    if (authenticated && path === "/login") {
        return "/";
    }

    if (path === "/login") {
        return true;
    }

    if (!authenticated) {
        return "/login";
    }

    return true;
}
