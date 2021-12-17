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

    public show(schema: Schema, request: Request) {
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

        return video.attrs;
    }

    public store(schema: Schema, request: Request) {
        const body = JSON.parse(request.requestBody);

        const video = schema.create("video", body);

        return {
            id: video.id,
            message: "Video created",
        };
    }

    public upload(schema: Schema, request: Request) {
        const form = request.requestBody as any as FormData;
        const formats = ["video/mp4", "video/webm", "video/ogg"];

        const file = form.get("file") as File;

        if (!file) {
            return new Response(
                400,
                {},
                {
                    message: "File is required",
                }
            );
        }

        if (formats.indexOf(file.type) === -1) {
            return new Response(
                400,
                {},
                {
                    message: "Invalid file format",
                }
            );
        }

        const video = schema.create("video");

        return {
            id: video.id,
            message: "Video upload started",
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
