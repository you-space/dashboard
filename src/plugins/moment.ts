import { AppContext } from "@/types";

import moment from "moment";

export function useMoment() {
    return moment;
}

export default function boot({ app }: AppContext) {
    app.config.globalProperties.$moment = moment;
}
