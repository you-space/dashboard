import { Response, createServer as baseCreateServer } from "miragejs";

import models from "./models";
import factories from "./factories";

export function createServer({ environment = "development" } = {}) {
    return baseCreateServer<typeof models, typeof factories>({
        environment,
        models,
        factories,
        seeds(server) {
            server.create("user", {
                name: "admin",
                username: "admin",
                password: "ys-123",
                email: "admin@teste.com",
            });

            server.createList("video", 100);
            server.createList("plugin", 5);
        },
        routes() {
            this.namespace = "/api/v1";
            this.timing = 500;

            this.get("videos", (schema, request) => {
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
            });

            this.get("plugins", (schema) => ({
                data: schema.db.plugins,
            }));

            this.post("plugins", (schema, request) => {
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
            });

            this.patch("plugins/:id", (schema, request) => {
                const plugin = (schema as any).plugins.find(request.params.id);

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
            });

            this.delete("plugins/:id", (schema, request) => {
                const plugin = (schema as any).plugins.find(request.params.id);

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
                    message: "Plugin updated",
                };
            });

            this.get("auth/user", (schema) =>
                schema.db.users.findBy({ username: "admin" })
            );

            this.post(
                "auth/logout",
                () => new Response(200, {}, { message: "Logout success" })
            );

            this.post("auth/login", (schema, request) => {
                const data = JSON.parse(request.requestBody);

                const user = schema.db.users.findBy({
                    username: data.uuid,
                    password: data.password,
                });

                if (!user) {
                    return new Response(
                        400,
                        {},
                        {
                            message: "E_INVALID_AUTH_UID: User not found",
                        }
                    );
                }

                return new Response(200, {}, { message: "Login success" });
            });
        },
    });
}
