import {
    Model,
    Factory,
    Response,
    createServer as baseCreateServer,
} from "miragejs";
import { kebabCase } from "lodash";
import faker from "faker";

const youtubeIds = [
    "6stlCkUDG_s",
    "gsnqXt7d1mU",
    "eg2g6FPsdLI",
    "4N8oOj_aue8",
    "oe70Uhjc_F4&list",
    "HccqokXN2n8",
    "Jh6jZftn2e0",
    "HHBsvKnCkwI",
    "NpdQkEPELh4",
    "ZjbFDYoE-OY",
];

const userFactory = Factory.extend({
    name: () => faker.name.findName(),
    username: () => faker.internet.userName(),
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
});

const videoFactory = Factory.extend({
    title: faker.name.title,
    description: faker.lorem.text,
    sourceId: () => faker.random.arrayElement(youtubeIds),
    src() {
        return `https://www.youtube.com/embed/${(this as any).sourceId}`;
    },
    publishedAt: faker.date.past,
});

const models = {
    video: Model.extend({}),
    user: Model.extend({}),
    plugin: Model.extend({}),
};

const factories = {
    video: videoFactory,
    user: userFactory,
    plugin: Factory.extend({
        id: () => kebabCase(faker.lorem.word()),
        title: () => faker.name.title(),
        description: () => faker.lorem.sentence(),
        active: () => faker.datatype.boolean(),
    }),
};

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

            server.createList("video", 20);
            server.createList("plugin", 5);
        },
        routes() {
            this.namespace = "/api/v1";
            this.timing = 500;

            this.get("videos", (schema) => ({
                data: schema.db.videos,
            }));

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
