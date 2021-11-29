import faker from "faker";
import { Factory } from "miragejs";

const userFactory = Factory.extend({
    name: () => faker.name.findName(),
    username: () => faker.internet.userName(),
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
});

export default userFactory;
