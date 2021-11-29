import { Request, Response } from "miragejs";
import { Schema } from "@/api/mirage/types";

class VideosController {
    public index(schema: Schema, request: Request) {
        const page = Number(request.queryParams.page) || 1;
        const limit = Number(request.queryParams.limit) || 10;
        const all = schema.db.videos;

        const videos = all.slice((page - 1) * limit, page * limit);

        return {
            meta: {
                total: all.length,
                currentPage: page,
                lastPage: Math.ceil(all.length / limit),
            },
            data: videos,
        };
    }

    public destroy(schema: Schema, request: Request) {
        const video = schema.find("video", request.params.id);

        if (!video) {
            return new Response(
                404,
                {},
                {
                    message: "Video not found",
                }
            );
        }

        video.destroy();

        return {
            message: "Video deleted",
        };
    }
}

export default new VideosController();
