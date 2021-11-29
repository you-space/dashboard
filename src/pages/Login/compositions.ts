import { http } from "@/api";

export async function login(uuid: string, password: string) {
    await http.post("/auth/login", {
        uuid,
        password,
    });

    return true;
}
