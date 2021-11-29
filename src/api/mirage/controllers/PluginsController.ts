import { Request, Response } from "miragejs";
import { Schema } from "@/api/mirage/types";

class PluginsController {
    public index(schema: Schema) {
        return {
            data: schema.db.plugins,
        };
    }

    public store(schema: Schema, request: Request) {
        const body = JSON.parse(request.requestBody);

        if (!body.gitUrl.includes(".git")) {
            return new Response(
                400,
                {},
                {
                    message: "Invalid git url",
                }
            );
        }

        schema.create("plugin", {
            title: body.gitUrl.split("/").pop().replace(".git", ""),
        });

        return {
            message: "Plugin download",
        };
    }

    public update(schema: Schema, request: Request) {
        const plugin = schema.find("plugin", request.params.id);

        if (!plugin) {
            return new Response(
                404,
                {},
                {
                    message: "Plugin not found",
                }
            );
        }

        const body = JSON.parse(request.requestBody);

        plugin.update(body);

        return {
            message: "Plugin updated",
        };
    }

    public destroy(schema: Schema, request: Request) {
        const plugin = schema.find("plugin", request.params.id);

        if (!plugin) {
            return new Response(
                404,
                {},
                {
                    message: "Plugin not found",
                }
            );
        }

        plugin.destroy();

        return {
            message: "Plugin deleted",
        };
    }
}

export default new PluginsController();
