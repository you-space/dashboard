import { Server, Model, Factory, Registry, Response } from "miragejs";
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
    video: Model,
    user: Model,
};

const factories = {
    video: videoFactory,
    user: userFactory,
};

type MirageRegistry = Registry<typeof models, typeof factories>;

export function createServer({ environment = "development" } = {}) {
    return new Server<MirageRegistry>({
        environment,
        models: models,
        factories: {
            user: userFactory,
            video: videoFactory,
        },
        seeds(server: Server<MirageRegistry>) {
            server.create("user", {
                name: "admin",
                username: "admin",
                password: "ys-123",
                email: "admin@teste.com",
            });
            server.createList("video", 20);
        },
        routes() {
            this.namespace = "/api/v1";
            this.timing = 500;

            this.get("videos", (schema) => ({
                data: schema.db.videos,
            }));

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
