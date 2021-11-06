import { Server, Model, Factory } from "miragejs";
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

export function createServer({ environment = "development" } = {}) {
    return new Server({
        environment,
        models: {
            video: Model,
        },
        factories: {
            video: Factory.extend({
                title: faker.name.title,
                description: faker.lorem.text,
                sourceId: () => faker.random.arrayElement(youtubeIds),
                src() {
                    return `https://www.youtube.com/embed/${
                        (this as any).sourceId
                    }`;
                },
                publishedAt: faker.date.past,
            }),
        },
        seeds(server) {
            server.createList("video", 20);
        },
        routes() {
            this.namespace = "api/v1";

            this.get("videos", (schema) => ({
                data: schema.db.videos,
            }));
        },
    });
}
