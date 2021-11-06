import { Server } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
    return new Server({
        environment,
        routes() {
            this.namespace = "api/v1";
        },
    });
}
