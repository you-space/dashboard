import { ServerPagination } from "@/types";
import { InjectionKey, provide, inject } from "vue";
import { api } from "./axios";

export interface Video {
    id: number;
    title: string;
    src: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export class VideoService {
    public async index() {
        const { data } = await api.get<ServerPagination<Video>>("/videos");

        return data;
    }
}

export const key: InjectionKey<VideoService> = Symbol("space:videos");

export function provideVideos(service: VideoService) {
    provide(key, service);
}

export function useVideos() {
    return inject(key, new VideoService());
}
