import { Request, Response } from "miragejs";
import { Schema } from "@/api/mirage/types";

export class ProvidersController {
    public index(schema: Schema) {
        const all = schema.db.providers;

        return {
            meta: {
                total: all.length,
            },
            data: all,
        };
    }

    public update(schema: Schema, request: Request) {
        const { id } = request.params;
        const body = JSON.parse(request.requestBody);
        const provider = schema.find("provider", id);

        if (!provider) {
            return new Response(
                404,
                {},
                {
                    message: "Provider not found",
                }
            );
        }

        provider.update({
            active: body.active,
        });

        return {
            message: "Provider updated",
        };
    }
}

export default new ProvidersController();
