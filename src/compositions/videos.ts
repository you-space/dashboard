import { ServerPagination } from "@/types";
import { InjectionKey, provide, inject } from "vue";
import { api } from "./axios";

export interface View {
    count: number;
}
export interface Image {
    name: string;
    src: string;
    alt: string;
}

export interface Video {
    id: number;
    src: string;
    title: string;
    description: string;

    source: string;
    sourceId: string;

    visibility: string;

    publishedAt: string;

    views: View[];
    images: Image[];
}

interface IndexFilters {
    page?: number;
    limit?: number;
    include?: string[];
}

export class VideoService {
    public async index(filters: IndexFilters) {
        const { data } = await api.get<ServerPagination<Video>>("/videos", {
            params: filters,
        });

        return data;
    }
    public async destroy(id: number) {
        const { data } = await api.delete(`/videos/${id}`);

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
