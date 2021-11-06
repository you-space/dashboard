import { api } from "@/compositions/axios";

export async function login(uuid: string, password: string) {
    await api.post("/auth/login", {
        uuid,
        password,
    });

    return true;
}
