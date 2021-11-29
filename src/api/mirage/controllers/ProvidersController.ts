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

    public show(schema: Schema, request: Request) {
        const { id } = request.params;
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

        return provider.attrs;
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

        provider.update(body);

        return {
            message: "Provider updated",
        };
    }

    public import(schema: Schema, request: Request) {
        const { id } = request.params;
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

        return {
            message: "Provider importation started",
        };
    }
}

export default new ProvidersController();
