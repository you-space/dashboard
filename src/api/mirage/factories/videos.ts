import Video from "@/api/models/video";
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

const videoFactory = Factory.extend<Video>({
    id: () => faker.datatype.number(),
    title: faker.name.title,
    description: () => faker.lorem.paragraphs(3),
    sourceId: () => faker.random.arrayElement(youtubeIds),
    source: "youtube",
    src() {
        return `https://www.youtube.com/embed/${this.sourceId}`;
    },
    publishedAt: () => faker.date.past().toISOString(),
    visibility: () => faker.random.arrayElement(["public", "private"]),
    views: () => [
        {
            count: faker.datatype.number({ min: 0, max: 10000 }),
        },
    ],
    images: () =>
        faker.random.arrayElement([
            [
                {
                    name: "thumbnail:default",
                    src: faker.image.imageUrl(),
                    alt: faker.lorem.word(),
                },
            ],
            [],
        ]),
});

export default videoFactory;
