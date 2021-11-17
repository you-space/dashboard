import { Response, createServer as baseCreateServer } from "miragejs";

import models from "./models";
import factories from "./factories";
import VideosController from "./controllers/VideosController";
import PluginsController from "./controllers/PluginsController";
import AuthController from "./controllers/AuthController";

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

            this.get("videos", VideosController.index);

            this.get("plugins", PluginsController.index);

            this.post("plugins", PluginsController.store);

            this.patch("plugins/:id", PluginsController.update);

            this.delete("plugins/:id", PluginsController.destroy);

            this.get("auth/user", AuthController.show);

            this.post("auth/logout", AuthController.logout);

            this.post("auth/login", AuthController.login);
        },
    });
}
