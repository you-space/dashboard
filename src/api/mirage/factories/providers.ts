import faker from "faker";
import { Factory } from "miragejs";
import { kebabCase } from "lodash";
import Provider from "@/api/models/provider";

const providerFactory = Factory.extend<Provider>({
    id: () => kebabCase(faker.lorem.word()),
    name: () => faker.name.title(),
    description: () => faker.lorem.sentence(),
    active: () => faker.datatype.boolean(),
    import: () => faker.random.arrayElement(["daily", "weekly", "monthly"]),
    fields: () => [
        {
            label: faker.name.title(),
            name: faker.lorem.word(),
            type: "text",
            value: faker.lorem.sentence(),
            encrypted: faker.datatype.boolean(),
        },
    ],
});

export default providerFactory;
