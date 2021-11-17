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
    title: string;
    src: string;
    description: string;
    publishedAt: string;

    views: View[];
    images: Image[];
}

interface IndexFilters {
    page?: number;
    limit?: number;
}

export class VideoService {
    public async index(filters: IndexFilters) {
        const { data } = await api.get<ServerPagination<Video>>("/videos", {
            params: filters,
        });

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
