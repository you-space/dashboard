import { PluginsRepository } from "./PluginsRepository";
import { ProvidersRepository } from "./ProvidersRepository";
import { VideosRepository } from "./VideosRepository";

export function useVideosRepository() {
    return new VideosRepository();
}

export function usePluginsRepository() {
    return new PluginsRepository();
}

export function useProvidersRepository() {
    return new ProvidersRepository();
}
