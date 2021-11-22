import { Request, Response } from "miragejs";
import { Schema } from "@/api/mirage/types";

class AuthController {
    public login(schema: Schema, request: Request) {
        const data = JSON.parse(request.requestBody);

        const user = schema.db.users.findBy({
            username: data.uuid,
            password: data.password,
        });

        if (!user) {
            return new Response(
                400,
                {},
                {
                    message: "E_INVALID_AUTH_UID: User not found",
                }
            );
        }

        return new Response(200, {}, { message: "Login success" });
    }

    public logout() {
        return new Response(200, {}, { message: "Logout success" });
    }

    public show(schema: Schema) {
        return schema.db.users.findBy({ username: "admin" });
    }
}

export default new AuthController();
