import { Request } from "miragejs";
import { Schema } from "@/mirage/types";

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
}

export default new VideosController();
