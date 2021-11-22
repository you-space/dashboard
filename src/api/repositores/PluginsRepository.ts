import { ServerPagination } from "@/api/common";
import { http } from "@/api";

import Plugin from "@/api/models/plugin";

export class PluginsRepository {
    public async index() {
        const { data } = await http.get<ServerPagination<Plugin>>("plugins");

        return data;
    }

    public async show() {
        const { data } = await http.get<Plugin>("plugins/show");

        return data;
    }

    public async store(gitUrl: string) {
        const { data } = await http.post("plugins", { gitUrl });

        return data;
    }

    public async update(id: Plugin["id"], plugin: Partial<Plugin>) {
        const { data } = await http.patch(`plugins/${id}`, plugin);

        return data;
    }

    public async destroy(id: Plugin["id"]) {
        const { data } = await http.delete(`plugins/${id}`);

        return data;
    }
}
