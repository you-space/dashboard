import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { AppContext } from "@vue/runtime-core";

export default function ({ app }: AppContext) {
    library.add(fas);
    app.component("font-awesome-icon", FontAwesomeIcon);
}
