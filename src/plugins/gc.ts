// global component register
import { AppContext } from "../types";

export default function boot({ app }: AppContext) {
    const files = import.meta.globEager("../components/*.vue");
    const layouts = import.meta.globEager("../layouts/*.vue");

    const components = Object.entries(files)
        .concat(Object.entries(layouts))
        .map(([key, component]) => {
            const name = key
                .replace("../components/", "")
                .replace("../layouts/", "Layout")
                .replace(".vue", "");

            return { name, component };
        });

    components.forEach(({ name, component }) => {
        app.component(name, component.default || component);
    });
}
