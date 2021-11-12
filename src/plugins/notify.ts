import { AppContext } from "@/types";
import colors from "tailwindcss/colors";
import lodash from "lodash";
interface NotifyOptions {
    message: string;
    color?: string;
    duration?: number;
}

interface Notification extends NotifyOptions {
    element: HTMLElement;
    done: boolean;
}

function createNotify() {
    const container = document.createElement("div");

    container.classList.add("notify-container");

    const notifications: Map<string, Notification> = new Map();

    document.body.appendChild(container);

    function show(notification: Notification) {
        notification.element.classList.remove("hide");
        notification.element.classList.add("animate");

        setTimeout(() => {
            notification.done = true;

            notification.element.classList.add("hide");
            notification.element.classList.remove("animate");
        }, notification.duration);
    }

    function add(options: NotifyOptions) {
        let notification = notifications.get(options.message);

        if (notification) {
            show(notification);
            return;
        }

        const element = document.createElement("div");

        const color = lodash.get(
            colors,
            options.color?.replace("-", ".") || ""
        );

        const duration = options.duration || 3000;

        element.classList.add("notify");

        element.innerHTML = options.message;

        if (color) {
            element.style.setProperty("--notify-color", color);
        }

        element.style.setProperty("--notify-duration", `${duration}ms`);

        container.appendChild(element);

        notification = {
            ...options,
            element,
            duration,
            done: false,
        };

        notifications.set(options.message, notification);

        show(notification);
    }

    return {
        notifications,
        add,
    };
}

export const notify = createNotify();

export default function boot({ app }: AppContext) {
    app.config.globalProperties.$notify = notify;
}
