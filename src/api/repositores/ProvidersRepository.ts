import { http, ServerPagination } from "@/api";
import Provider from "../models/provider";

export class ProvidersRepository {
    public async index() {
        const { data } = await http.get<ServerPagination<Provider>>(
            "/providers"
        );

        data.data = data.data.map((provider) => new Provider(provider));

        return data;
    }

    public async show(id: string) {
        const { data } = await http.get<Provider>(`/providers/${id}`);

        return new Provider(data);
    }

    public async update(id: string, payload: Partial<Provider>) {
        const { data } = await http.patch(`/providers/${id}`, payload);

        return data;
    }

    public async import(id: string) {
        const { data } = await http.post(`/providers/${id}/import`);

        return data;
    }
}
