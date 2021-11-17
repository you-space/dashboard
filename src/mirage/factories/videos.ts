import faker from "faker";
import { Factory } from "miragejs";

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

const videoFactory = Factory.extend({
    title: faker.name.title,
    description: faker.lorem.text,
    sourceId: () => faker.random.arrayElement(youtubeIds),
    source: () => faker.random.arrayElement(["youtube", "vimeo"]),
    src() {
        return `https://www.youtube.com/embed/${(this as any).sourceId}`;
    },
    publishedAt: faker.date.past,
    visibility: () => ({
        name: faker.random.arrayElement(["public", "private"]),
    }),
    views: () => [
        {
            count: faker.datatype.number({ min: 0, max: 100 }),
        },
    ],
});

export default videoFactory;
