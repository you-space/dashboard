import lodash from "lodash";
import moment from "moment";

import { Store } from "vuex";
import { rules } from "./plugins/helper";
import { RootState } from "./store/state";

declare module "@vue/runtime-core" {
    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<RootState>;
        $rules: typeof rules;
        $lodash: typeof lodash;
        $moment: typeof moment;
    }
}
