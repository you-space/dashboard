import { AppContext } from "@/types";

export default function boot({ store }: AppContext) {
    const isDark =
        localStorage.getItem("space:dashboard:theme:dark") === "true";

    store.commit("app/setDarkMode", isDark);
}
