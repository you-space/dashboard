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

    notify.add({
        color: "red-500",
        message,
    });

    return Promise.reject(error);
}

api.interceptors.request.use(
    (args) => args,
    (error) => handleError(error)
);

api.interceptors.response.use(
    (args) => args,
    (error) => handleError(error)
);

export { api };
