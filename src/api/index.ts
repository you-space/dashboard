import { notify } from "@/plugins/notify";
import axios from "axios";
import lodash from "lodash";

const http = axios.create({
    baseURL: "/api/v1",
});

const ignorePaths = ["/auth/user", "/auth/logout"];

function handleError(error: any) {
    const message = lodash.get(
        error,
        "response.data.message",
        "Error on request"
    );

    const url = lodash.get(error, "config.url", "");

    if (ignorePaths.includes(url)) {
        return;
    }

    const status = lodash.get(error, "response.status", 501);

    notify.add({
        color: status === 400 ? "yellow-500" : "red-500",
        message,
    });

    Object.entries(lodash.get(error, "response.data.errors", {}))
        .map((entry) => `${entry[0]}: ${entry[1]}`)
        .forEach(notify.warn);

    return Promise.reject(error);
}

http.interceptors.request.use(
    (config) => config,
    (error) => handleError(error)
);

http.interceptors.response.use(
    (config) => config,
    (error) => handleError(error)
);

export * from "./common";

export { http };
