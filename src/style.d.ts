import { CSSProperties } from "vue";

declare module "vue" {
    interface CSSProperties {
        // limited to custom properties:
        [k: `--${string}`]: string | undefined;
    }
}
