import { ServerPagination } from "@/types";
import { InjectionKey, provide, inject } from "vue";
import { api } from "./axios";

export interface Plugin {
    id: string;
    title: string;
    active: boolean;
}

export class PluginsService {
    public async index() {
        const { data } = await api.get<ServerPagination<Plugin>>("plugins");

        return data;
    }

    public async show() {
        const { data } = await api.get<Plugin>("plugins/show");

        return data;
    }

    public async store(gitUrl: string) {
        const { data } = await api.post("plugins", { gitUrl });

        return data;
    }

    public async update(id: Plugin["id"], plugin: Partial<Plugin>) {
        const { data } = await api.patch(`plugins/${id}`, plugin);

        return data;
    }

    public async destroy(id: Plugin["id"]) {
        const { data } = await api.delete(`plugins/${id}`);

        return data;
    }
}

export const key: InjectionKey<PluginsService> = Symbol("space:plugins");

export function providePlugins(service: PluginsService) {
    provide(key, service);
}

export function usePlugins() {
    return inject(key, new PluginsService());
}
