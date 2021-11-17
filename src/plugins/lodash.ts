import { AppContext } from "@/types";
import lodash from "lodash";

export default function boot({ app }: AppContext) {
    app.config.globalProperties.$lodash = lodash;
}
