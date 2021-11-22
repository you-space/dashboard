import Video from "@/api/models/video";
import { ServerPagination } from "@/api/common";
import { http } from "@/api";

export class VideosRepository {
    public async index(filters: any) {
        const { data } = await http.get<ServerPagination<Video>>("/videos", {
            params: filters,
        });

        data.data = data.data.map((video: any) => new Video(video));

        return data;
    }

    public async destroy(id: number) {
        const { data } = await http.delete(`/videos/${id}`);

        return data;
    }
}
