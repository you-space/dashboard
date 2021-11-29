import pluginFactory from "./plugins";
import providersFactory from "./providers";
import userFactory from "./users";
import videoFactory from "./videos";

export default {
    video: videoFactory,
    user: userFactory,
    plugin: pluginFactory,
    provider: providersFactory,
};
