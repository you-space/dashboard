import { notify } from "@/plugins/notify";
import axios from "axios";
import lodash from "lodash";

const api = axios.create({
    baseURL: "/api/v1",
});

function handleError(error: any) {
    const message = lodash.get(
        error,
        "response.data.message",
        "Error on request"
    );

    const status = lodash.get(error, "response.status", 501);

    notify.add({
        color: status === 400 ? "yellow-500" : "red-500",
        message,
    });

    return Promise.reject(error);
}

api.interceptors.request.use(
    (config) => config,
    (error) => handleError(error)
);

api.interceptors.response.use(
    (config) => config,
    (error) => handleError(error)
);

export { api };
