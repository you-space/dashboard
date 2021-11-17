import pluginFactory from "./plugins";
import userFactory from "./users";
import videoFactory from "./videos";

export default {
    video: videoFactory,
    user: userFactory,
    plugin: pluginFactory,
};
