import { MiddlewareContext } from "@/types";

export default function middleware({ to, store }: MiddlewareContext) {
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
