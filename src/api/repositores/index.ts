import { PluginsRepository } from "./plugins-repository";
import { VideosRepository } from "./videos-repository";

export function useVideosRepository() {
    return new VideosRepository();
}

export function usePluginsRepository() {
    return new PluginsRepository();
}
