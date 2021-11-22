import faker from "faker";
import { Factory } from "miragejs";
import { kebabCase } from "lodash";

const providerFactory = Factory.extend({
    id: () => kebabCase(faker.lorem.word()),
    title: () => faker.name.title(),
    description: () => faker.lorem.sentence(),
    active: () => faker.datatype.boolean(),
});

export default providerFactory;
